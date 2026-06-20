# Servicios Premium — Cards Uniformes

## Fecha
2026-06-19

## Problema
La card principal ("Tienda Especializada") en la sección de Servicios Premium ocupa 2 filas del grid (`grid-row: 1 / 3`), lo que la hace desproporcionadamente más grande que las otras 3 cards, rompiendo la uniformidad visual.

## Diseño Aprobado

### Grid
- Cambiar de `grid-template-columns: 2fr 1fr 1fr` a `repeat(2, 1fr)`.
- 2 columnas, 2 filas. Todas las cards ocupan 1 celda.
- Eliminar `grid-row: 1 / 3` y la clase `.sc-featured` de la card 1.

### Cards
- Padding unificado: `32px 28px` (antes `40px 36px` para todas).
- Eliminar el borde gradient (`background: linear-gradient(...) border-box`) de la card 1.
- Todas las cards usan el mismo estilo: borde izquierdo decorativo en hover via `::before`.
- La card 1 conserva su contenido completo (título, párrafo, lista de 3 items, CTA).

### Responsive
- **1100px:** Se mantiene `repeat(2, 1fr)` (sin cambios).
- **900px:** Pasa a 1 columna.
- **640px:** Padding reduce a `24px 20px`.

### Archivos a modificar
1. `src/pages/index.astro` — Quitar clase `sc-featured` de la card 1.
2. `src/styles/global.css` — Modificar `.services-grid`, eliminar `.sc-featured`, ajustar padding de `.service-card`, actualizar responsive.

## Criterios de éxito
- Las 4 cards tienen el mismo tamaño en escritorio.
- El grid se ve equilibrado y estético.
- No se pierde contenido ni funcionalidad.
- El responsive mantiene buena legibilidad.
