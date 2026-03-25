# Universo Musical

Sitio web comercial construido con Astro para mostrar el inventario real de Universo Musical con una home enfocada en conversion y dos vistas separadas de catalogo:

- `/instrumentos`
- `/accesorios`

La informacion del catalogo se carga desde `inventario para siigo.xlsx` durante la build. El recorrido comercial esta centrado en WhatsApp como canal principal de contacto.

## Estructura principal

```text
/
|-- inventario para siigo.xlsx
|-- public/
|-- src/
|   |-- components/
|   |-- layouts/
|   |-- lib/
|   `-- pages/
|-- astro.config.mjs
|-- package.json
`-- tsconfig.json
```

## Comandos

Todos los comandos se ejecutan desde la raiz del proyecto:

| Comando | Accion |
| :-- | :-- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el entorno local en `localhost:4321` |
| `pnpm build` | Genera la version estatica en `dist/` |
| `pnpm preview` | Sirve la build localmente |

## Flujo de inventario

1. Reemplaza o actualiza `inventario para siigo.xlsx`.
2. Ejecuta `pnpm build`.
3. La web vuelve a generar la home y los catalogos con los datos nuevos.

## Stack

- [Astro](https://astro.build/)
- [pnpm](https://pnpm.io/)
- [xlsx](https://www.npmjs.com/package/xlsx)
