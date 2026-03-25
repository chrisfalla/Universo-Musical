import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import XLSX from 'xlsx';

import { createProductWhatsAppMessage, createWhatsAppLink } from './whatsapp';

export type CatalogGroup = 'instrumentos' | 'accesorios';
export type AvailabilityTone = 'available' | 'low' | 'check';

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  group: CatalogGroup;
  family: string;
  familyKey: string;
  price: number | null;
  priceLabel: string;
  stock: number | null;
  availability: string;
  availabilityTone: AvailabilityTone;
  includes: string | null;
  whatsAppMessage: string;
  whatsAppLink: string;
  searchText: string;
}

export interface CatalogFamilySummary {
  key: string;
  family: string;
  total: number;
  available: number;
}

export interface CatalogOverview {
  group: CatalogGroup;
  items: CatalogItem[];
  families: string[];
  familySummaries: CatalogFamilySummary[];
  totalItems: number;
  availableItems: number;
  pricedItems: number;
}

interface CatalogAccumulator {
  name: string;
  group: CatalogGroup;
  family: string;
  includes: Set<string>;
  stock: number;
  hasStock: boolean;
  prices: number[];
}

type FamilyRule = {
  family: string;
  keywords: string[];
};

const PRICE_FORMATTER = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

const INVENTORY_PATH = fileURLToPath(new URL('../../inventario para siigo.xlsx', import.meta.url));

const FAMILY_RULES: Record<CatalogGroup, FamilyRule[]> = {
  instrumentos: [
    {
      family: 'Escolares/infantiles',
      keywords: ['infantil', 'escolar', 'dulce', 'melodica', 'metalofono', 'xilofono', 'didactico']
    },
    {
      family: 'Audio y amplificacion',
      keywords: ['amplificador', 'cabina', 'mezclador', 'consola', 'mixer', 'parlante']
    },
    { family: 'Bajos', keywords: ['bajo electrico', ' bajo ', 'bass'] },
    { family: 'Ukuleles', keywords: ['ukulele', 'ukelele'] },
    { family: 'Teclados', keywords: ['teclado', 'piano', 'keyboard', 'sintetizador'] },
    {
      family: 'Percusion',
      keywords: [
        'bateria',
        'tambor',
        'pandereta',
        'guiro',
        'cajon',
        'bongo',
        'conga',
        'timbal',
        'maraca',
        'campana',
        'cencerro',
        'redoblante'
      ]
    },
    {
      family: 'Vientos',
      keywords: ['flauta', 'saxo', 'trompeta', 'trombon', 'clarinete', 'armonica', 'ocarina', 'quena', 'corneta']
    },
    { family: 'Violines y cuerdas frotadas', keywords: ['violin', 'viola', 'cello', 'contrabajo', 'arco'] },
    { family: 'Guitarras', keywords: ['guitarra', 'requinto', 'tiple', 'mandolina', 'bandola'] }
  ],
  accesorios: [
    { family: 'Accesorios para teclado', keywords: ['teclado', 'pedal', 'sustain'] },
    { family: 'Microfonos', keywords: ['microfono', 'mic'] },
    { family: 'Atriles y soportes', keywords: ['atril', 'soporte', 'base'] },
    {
      family: 'Puentes y repuestos',
      keywords: ['puente', 'cejilla', 'clavija', 'clavijero', 'pin', 'capotraste', 'pastilla', 'boton', 'selleta', 'cordal']
    },
    { family: 'Baquetas y puas', keywords: ['baqueta', 'baquetas', 'pua', 'palillo'] },
    { family: 'Correas', keywords: ['correa', 'strap'] },
    { family: 'Cables', keywords: ['cable', 'plug', 'jack'] },
    { family: 'Estuches', keywords: ['estuche', 'funda', 'forro', 'semiduro', 'hardcase'] },
    { family: 'Encordados', keywords: ['encordado', 'cuerda', 'nylon', 'inox', 'acero', 'bronce'] }
  ]
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

function slugify(value: string) {
  return normalizeText(value).replace(/\s+/g, '-');
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim();
}

function cleanIncludes(group: CatalogGroup, value: unknown) {
  if (group !== 'instrumentos') {
    return '';
  }

  const includes = cleanString(value);

  if (!includes) {
    return '';
  }

  const normalized = normalizeText(includes);
  const allowedKeywords = [
    'cable',
    'correa',
    'estuche',
    'baqueta',
    'control',
    'trinche',
    'caja',
    'lona',
    'cuerda',
    'forro',
    'funda',
    'pedal'
  ];

  if (normalized.startsWith('devolucion')) {
    return '';
  }

  return allowedKeywords.some((keyword) => normalized.includes(keyword)) ? includes : '';
}

function parseNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/,/g, '').trim();

    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function getAvailability(stock: number | null) {
  if (stock === null || stock <= 0) {
    return { label: 'Consultar disponibilidad', tone: 'check' as const };
  }

  if (stock <= 3) {
    return { label: 'Pocas unidades', tone: 'low' as const };
  }

  return { label: 'Disponible', tone: 'available' as const };
}

function detectFamily(group: CatalogGroup, productName: string) {
  const haystack = ` ${normalizeText(productName)} `;

  for (const rule of FAMILY_RULES[group]) {
    const matched = rule.keywords.some((keyword) => haystack.includes(` ${normalizeText(keyword)} `));

    if (matched) {
      return rule.family;
    }
  }

  return 'Otros';
}

function readSheetRows(group: CatalogGroup) {
  if (!existsSync(INVENTORY_PATH)) {
    throw new Error(`No se encontro el inventario en ${INVENTORY_PATH}.`);
  }

  const workbook = XLSX.readFile(INVENTORY_PATH);
  const sheetName = workbook.SheetNames.find((candidate) => {
    const normalized = normalizeText(candidate);
    return group === 'instrumentos'
      ? normalized === 'instrumentos'
      : normalized === 'acesorios' || normalized === 'accesorios';
  });

  if (!sheetName) {
    throw new Error(`No se encontro la hoja para ${group} en el archivo de inventario.`);
  }

  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[sheetName], {
    defval: ''
  });

  return rawRows.map((row) => {
    const normalizedEntries = Object.entries(row).map(([key, value]) => [key.trim(), value] as const);
    return Object.fromEntries(normalizedEntries);
  });
}

function buildGroupCatalog(group: CatalogGroup): CatalogOverview {
  const records = readSheetRows(group);
  const merged = new Map<string, CatalogAccumulator>();

  for (const record of records) {
    const rawName = cleanString(record.ARTICULO);

    if (!rawName) {
      continue;
    }

    const normalizedKey = normalizeText(rawName);
    const price = parseNumber(record['Precio en tienda']);
    const stock = parseNumber(record['inventario actual']);
    const includes = cleanIncludes(group, record.Incluye);
    const family = detectFamily(group, rawName);

    const existing = merged.get(normalizedKey);

    if (existing) {
      if (includes) {
        existing.includes.add(includes);
      }

      if (typeof stock === 'number') {
        existing.stock += Math.max(0, Math.round(stock));
        existing.hasStock = true;
      }

      if (typeof price === 'number' && price > 0) {
        existing.prices.push(Math.round(price));
      }

      continue;
    }

    const accumulator: CatalogAccumulator = {
      name: rawName,
      group,
      family,
      includes: new Set(includes ? [includes] : []),
      stock: typeof stock === 'number' ? Math.max(0, Math.round(stock)) : 0,
      hasStock: typeof stock === 'number',
      prices: typeof price === 'number' && price > 0 ? [Math.round(price)] : []
    };

    merged.set(normalizedKey, accumulator);
  }

  const items = Array.from(merged.values())
    .map<CatalogItem>((entry) => {
      const price = entry.prices.length > 0 ? Math.max(...entry.prices) : null;
      const stock = entry.hasStock ? entry.stock : null;
      const availability = getAvailability(stock);
      const includes = entry.includes.size > 0 ? Array.from(entry.includes).join(', ') : null;
      const sectionLabel = entry.group === 'instrumentos' ? 'instrumentos' : 'accesorios';
      const whatsAppMessage = createProductWhatsAppMessage(entry.name, sectionLabel);

      return {
        id: `${entry.group}-${slugify(entry.name)}`,
        slug: slugify(entry.name),
        name: entry.name,
        group: entry.group,
        family: entry.family,
        familyKey: slugify(entry.family),
        price,
        priceLabel: price ? PRICE_FORMATTER.format(price) : 'Consultar precio',
        stock,
        availability: availability.label,
        availabilityTone: availability.tone,
        includes,
        whatsAppMessage,
        whatsAppLink: createWhatsAppLink(whatsAppMessage),
        searchText: normalizeText([entry.name, entry.family, includes ?? ''].join(' '))
      };
    })
    .sort((left, right) => {
      const familyOrder = left.family.localeCompare(right.family, 'es');
      return familyOrder !== 0 ? familyOrder : left.name.localeCompare(right.name, 'es');
    });

  const familyMap = new Map<string, CatalogFamilySummary>();

  for (const item of items) {
    const existing = familyMap.get(item.family);

    if (existing) {
      existing.total += 1;
      existing.available += item.stock && item.stock > 0 ? 1 : 0;
      continue;
    }

    familyMap.set(item.family, {
      key: item.familyKey,
      family: item.family,
      total: 1,
      available: item.stock && item.stock > 0 ? 1 : 0
    });
  }

  const familySummaries = Array.from(familyMap.values()).sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total;
    }

    return left.family.localeCompare(right.family, 'es');
  });

  return {
    group,
    items,
    families: familySummaries.map((family) => family.family),
    familySummaries,
    totalItems: items.length,
    availableItems: items.filter((item) => item.stock && item.stock > 0).length,
    pricedItems: items.filter((item) => item.price !== null).length
  };
}

const catalogByGroup: Record<CatalogGroup, CatalogOverview> = {
  instrumentos: buildGroupCatalog('instrumentos'),
  accesorios: buildGroupCatalog('accesorios')
};

export function getCatalogOverview(group: CatalogGroup) {
  return catalogByGroup[group];
}

export function getCatalogSnapshot() {
  return {
    instrumentos: catalogByGroup.instrumentos,
    accesorios: catalogByGroup.accesorios
  };
}
