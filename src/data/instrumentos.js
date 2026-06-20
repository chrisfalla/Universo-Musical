export const categorias = [
  {
    slug: "guitarras",
    nombre: "Guitarras",
    icono: "🎸",
    descripcion: "Eléctricas, acústicas, clásicas y bajos.",
    descripcionLarga: "Explora nuestra colección de guitarras eléctricas, acústicas y clásicas. Contamos con más de 120 modelos de las mejores marcas del mundo.",
    marcas: ["Fender", "Gibson", "Yamaha"],
    count: 120,
    productos: [
      { nombre: "Stratocaster", marca: "Fender", precio: 2800000, descripcion: "Sonido versátil y diseño atemporal, la guitarra eléctrica más icónica de la historia.", icono: "🎸" },
      { nombre: "Les Paul Standard", marca: "Gibson", precio: 3500000, descripcion: "Tono cálido y sustain infinito. La leyenda del rock por excelencia.", icono: "🎸" },
      { nombre: "Pacifica 112V", marca: "Yamaha", precio: 850000, descripcion: "Calidad excepcional a un precio accesible. Perfecta para iniciar.", icono: "🎸" },
      { nombre: "Telecaster", marca: "Fender", precio: 2200000, descripcion: "Sonido nítido y construcción robusta. La favorita del country y el blues.", icono: "🎸" },
      { nombre: "SG Standard", marca: "Gibson", precio: 2900000, descripcion: "Cuerpo delgado, sonido agresivo. Diseñada para la velocidad.", icono: "🎸" },
      { nombre: "C40 Classical", marca: "Yamaha", precio: 420000, descripcion: "Guitarra clásica de nivel de entrada con sonido cálido y auténtico.", icono: "🎸" },
    ]
  },
  {
    slug: "pianos",
    nombre: "Pianos & Teclados",
    icono: "🎹",
    descripcion: "Digitales, MIDI y sintetizadores.",
    descripcionLarga: "Descubre nuestra selección de pianos digitales, teclados MIDI y sintetizadores para principiantes y profesionales.",
    marcas: ["Roland", "Korg", "Casio"],
    count: 85,
    productos: [
      { nombre: "FP-30X", marca: "Roland", precio: 2600000, descripcion: "Piano digital portátil con teclado contrapesado y sonido SuperNATURAL.", icono: "🎹" },
      { nombre: "Kronos 2", marca: "Korg", precio: 8500000, descripcion: "Workstation definitiva con 9 motores de sonido y pantalla táctil.", icono: "🎹" },
      { nombre: "PX-S1100", marca: "Casio", precio: 1800000, descripcion: "Piano digital ultradelgado con diseño elegante y sonido envolvente.", icono: "🎹" },
      { nombre: "Fantom-08", marca: "Roland", precio: 5200000, descripcion: "Workstation profesional con sonido expansivo y flujo de trabajo intuitivo.", icono: "🎹" },
      { nombre: "Minilogue XD", marca: "Korg", precio: 1900000, descripcion: "Sintetizador analógico-polifónico con efectos digitales integrados.", icono: "🎹" },
      { nombre: "CT-S100", marca: "Casio", precio: 380000, descripcion: "Teclado portátil ideal para principiantes con 61 teclas sensibles.", icono: "🎹" },
    ]
  },
  {
    slug: "percusion",
    nombre: "Percusión",
    icono: "🥁",
    descripcion: "Baterías acústicas y electrónicas.",
    descripcionLarga: "Todo para el percusionista: baterías acústicas, electrónicas, congas, bongós y percusión latina.",
    marcas: ["Pearl", "Tama", "DW"],
    count: 60,
    productos: [
      { nombre: "Export EXX", marca: "Pearl", precio: 3200000, descripcion: "Batería completa con cascos de álamo y herrajes cromados de alta resistencia.", icono: "🥁" },
      { nombre: "Superstar Classic", marca: "Tama", precio: 4800000, descripcion: "Cascos de arce con acabado lacado y sonido resonante y cálido.", icono: "🥁" },
      { nombre: "Performance Series", marca: "DW", precio: 7500000, descripcion: "Batería profesional con cascos de arce americano y herrajes de primera.", icono: "🥁" },
      { nombre: "TD-17KVX", marca: "Roland", precio: 4200000, descripcion: "Batería electrónica con pads mesh y módulo de sonido de última generación.", icono: "🥁" },
      { nombre: "Roadshow", marca: "Pearl", precio: 2100000, descripcion: "Batería completa ideal para principiantes con todo incluido.", icono: "🥁" },
      { nombre: "Starclassic", marca: "Tama", precio: 5900000, descripcion: "Cascos de abedul/bubinga con sonido potente y ataque definido.", icono: "🥁" },
    ]
  },
  {
    slug: "vientos",
    nombre: "Vientos",
    icono: "🎷",
    descripcion: "Saxofones, trompetas y flautas.",
    descripcionLarga: "Saxofones, trompetas, trombones, flautas y más instrumentos de viento de las mejores marcas.",
    marcas: ["Selmer", "Bach", "Yamaha"],
    count: 45,
    productos: [
      { nombre: "Super Action 80", marca: "Selmer", precio: 6500000, descripcion: "Saxofón alto profesional con sonido rico y respuesta inmediata.", icono: "🎷" },
      { nombre: "Stradivarius 180S", marca: "Bach", precio: 3800000, descripcion: "Trompeta profesional con campana de una pieza y sonido brillante.", icono: "🎺" },
      { nombre: "Xeno 847", marca: "Yamaha", precio: 4200000, descripcion: "Saxofón tenor con precisión tonal y artesanía superior.", icono: "🎷" },
      { nombre: "52nd Street", marca: "Jupiter", precio: 2600000, descripcion: "Saxofón alto estudiante con excelente relación calidad-precio.", icono: "🎷" },
      { nombre: "Prelude", marca: "Selmer", precio: 1800000, descripcion: "Clarinete estudiante con cuerpo de resina y llaves plateadas.", icono: "🎷" },
      { nombre: "YFL-222", marca: "Yamaha", precio: 2100000, descripcion: "Flauta traversa estudiante con cabeza plateada y cuerpo niquelado.", icono: "🪈" },
    ]
  },
  {
    slug: "cuerdas-clasicas",
    nombre: "Cuerdas Clásicas",
    icono: "🎻",
    descripcion: "Violines, violas y chelos.",
    descripcionLarga: "Violines, violas, chelos y contrabajos para estudiantes y concertistas de las mejores casas luthier.",
    marcas: ["Stentor", "Cremona", "D'Addario"],
    count: 30,
    productos: [
      { nombre: "Student 1400", marca: "Stentor", precio: 650000, descripcion: "Violín estudiante de alta calidad con tapa de abeto y fondo de arce.", icono: "🎻" },
      { nombre: "SV-175", marca: "Cremona", precio: 1800000, descripcion: "Violín profesional con tapa de abeto alemán y acabado brillante.", icono: "🎻" },
      { nombre: "Prelude Set", marca: "D'Addario", precio: 85000, descripcion: "Juego completo de cuerdas de violín estudiante con núcleo de acero.", icono: "🎻" },
      { nombre: "Conservatoire", marca: "Stentor", precio: 2200000, descripcion: "Violín avanzado con maderas seleccionadas y puente ajustado a mano.", icono: "🎻" },
      { nombre: "SV-100", marca: "Cremona", precio: 950000, descripcion: "Violín estudiante-progresión con excelente proyección de sonido.", icono: "🎻" },
      { nombre: "Kaplan Set", marca: "D'Addario", precio: 150000, descripcion: "Juego de cuerdas profesional con núcleo de aleación y sonido cálido.", icono: "🎻" },
    ]
  },
  {
    slug: "sonidos-digitales",
    nombre: "Sonidos Digitales",
    icono: "🎧",
    descripcion: "Sample packs, plugins VST y loops.",
    descripcionLarga: "Sample packs, plugins VST, loops y bancos de sonidos profesionales para productores y compositores.",
    marcas: ["Splice", "Native", "Arturia"],
    count: 500,
    productos: [
      { nombre: "Splice Sounds", marca: "Splice", precio: 300000, descripcion: "Plataforma de samples por suscripción con millones de sonidos profesionales.", icono: "🎧" },
      { nombre: "Komplete 14", marca: "Native Instruments", precio: 2800000, descripcion: "Colección completa de instrumentos virtuales y efectos para producción musical.", icono: "🎛️" },
      { nombre: "V Collection 9", marca: "Arturia", precio: 3200000, descripcion: "Emulaciones auténticas de sintetizadores y teclados vintage.", icono: "🎹" },
      { nombre: "Serum", marca: "Xfer Records", precio: 450000, descripcion: "Sintetizador wavetable con interfaz visual intuitiva y sonido de alto nivel.", icono: "🎛️" },
      { nombre: "Omnisphere 2", marca: "Spectrasonics", precio: 1800000, descripcion: "El sintetizador insignia con biblioteca de sonidos de más de 14,000 presets.", icono: "🎚️" },
      { nombre: "Battery 4", marca: "Native Instruments", precio: 450000, descripcion: "Sampler de batería profesional con biblioteca de más de 100 kits.", icono: "🥁" },
    ]
  }
]

export const accesorios = {
  nombre: "Accesorios & Equipo",
  icono: "🎛️",
  descripcionLarga: "Todo lo que necesitas para complementar tu equipo musical. Cuerdas, pedales, amplificadores, cables, estuches y más de las mejores marcas.",
  count: 200,
  marcas: ["D'Addario", "BOSS", "Marshall", "Shure", "Fender"],
  productos: [
    { nombre: "Cuerdas Eléctricas .009", marca: "D'Addario", precio: 35000, descripcion: "Juego de cuerdas calibre .009 para guitarra eléctrica, tono brillante y duradero.", icono: "🎸" },
    { nombre: "Cuerdas Acústicas .012", marca: "D'Addario", precio: 38000, descripcion: "Juego de cuerdas bronce .012 para guitarra acústica, sonido cálido y resonante.", icono: "🎸" },
    { nombre: "Cuerdas Bajo .045", marca: "D'Addario", precio: 45000, descripcion: "Juego de cuerdas para bajo eléctrico calibre .045, graves profundos.", icono: "🎸" },
    { nombre: "DS-1 Distortion", marca: "BOSS", precio: 320000, descripcion: "Pedal de distorsión clásico con sonido agresivo y versátil.", icono: "🎛️" },
    { nombre: "DD-8 Digital Delay", marca: "BOSS", precio: 380000, descripcion: "Pedal de delay con 11 modos de eco y hasta 40 segundos de grabación.", icono: "🎛️" },
    { nombre: "Tu-3 Chromatic Tuner", marca: "BOSS", precio: 280000, descripcion: "Afinador cromático con display LED y salida de bypass confiable.", icono: "🎛️" },
    { nombre: "Code 50", marca: "Marshall", precio: 1200000, descripcion: "Amplificador de 50W con modelado digital y efectos integrados.", icono: "🎸" },
    { nombre: "MG30GFX", marca: "Marshall", precio: 850000, descripcion: "Amplificador de 30W con efectos digitales y sonido clásico Marshall.", icono: "🎸" },
    { nombre: "SM57", marca: "Shure", precio: 520000, descripcion: "Micrófono dinámico icónico para instrumentos y voces, robusto y confiable.", icono: "🎤" },
    { nombre: "SM58", marca: "Shure", precio: 580000, descripcion: "Micrófono vocal estándar de la industria con sonido cálido y claro.", icono: "🎤" },
    { nombre: "Cable Instrumento 3m", marca: "Fender", precio: 65000, descripcion: "Cable blindado de 3 metros con conectores niquelados y aislamiento premium.", icono: "🔌" },
    { nombre: "Estuche Rígido Universal", marca: "Fender", precio: 320000, descripcion: "Estuche acolchado con protección reforzada y compartimento de accesorios.", icono: "🧳" },
  ]
}

export function getCategoria(slug) {
  return categorias.find(c => c.slug === slug) || null
}

export function formatearPrecio(precio) {
  return '$' + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
