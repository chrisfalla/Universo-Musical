# Catálogo de Instrumentos — Páginas individuales por categoría

## Fecha
2026-06-19

## Problema
La sección "Nuestro Catálogo" tiene 6 cards de categorías (Guitarras, Pianos, Percusión, Vientos, Cuerdas, Sonidos Digitales) con links "Ver todo" que no tienen funcionalidad. No hay forma de ver los productos de cada categoría.

## Diseño Aprobado

### Arquitectura
Páginas estáticas generadas por Astro para cada categoría, usando rutas dinámicas (`getStaticPaths()`).

```
/instrumentos/guitarras/
/instrumentos/pianos/
/instrumentos/percusion/
/instrumentos/vientos/
/instrumentos/cuerdas/
/instrumentos/sonidos-digitales/
```

### Nuevos archivos

| Archivo | Propósito |
|---------|-----------|
| `src/data/instrumentos.js` | Data de categorías y productos (demo realista) |
| `src/pages/instrumentos/[slug].astro` | Página dinámica por categoría |
| `src/components/ProductCard.astro` | Card visual de producto |

### Flujo
1. Usuario hace clic en "Ver todo" en una card del index
2. Navega a `/instrumentos/guitarras/`
3. Ve una cuadrícula con 6 productos de esa categoría
4. Puede volver al inicio con "← Volver"

### Data de ejemplo
6 categorías, 6 productos realistas cada una (36 total). Precios en COP, marcas reales.

### Diseño visual de ProductCard
Siguiendo dark theme existente con gradient rojo/dorado:

```
┌────────────────────────────┐
│  [gradient area]           │ ← fondo gradient con ícono
│       🎸                    │
│                             │
│  FENDER               ⤴    │ ← badge marca + icono externo
│  ─────────────────────      │
│  Stratocaster              │ ← nombre producto
│  Descripción corta.        │
│                             │
│  $2,800,000                │ ← precio grande, amarillo
│                             │
│  ┌────────────────────┐    │
│  │  Consultar →       │    │ ← botón outline
│  └────────────────────┘    │
└────────────────────────────┘
```

### Comportamiento
- **Hover:** Card se eleva, borde se ilumina
- **Grid:** 3 cols desktop, 2 tablet, 1 mobile
- **"Consultar":** Placeholder a `#`

### Archivos a modificar
1. `src/pages/index.astro` — Actualizar links "Ver todo" con rutas reales
