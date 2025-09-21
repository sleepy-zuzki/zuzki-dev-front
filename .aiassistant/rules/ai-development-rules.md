---
apply: always
---

# Reglas de desarrollo para agentes (Angular + Tailwind + A11y + SEO)

Objetivo: asegurar cambios consistentes, accesibles y fáciles de mantener por parte de agentes y humanos.

Principios
- Consistencia y simplicidad: componentes pequeños, standalone y con inputs/outputs claros.
- Accesibilidad por defecto: etiquetas ARIA, landmarks correctos, focus visible y contraste.
- SEO semántico: usar etiquetas semánticas (main, section, header, nav, article, figure, figcaption, address).
- Tokens de diseño: preferir utilidades/superficies del tema (surface-*, brand-*, ui-*) y clases existentes antes que estilos ad-hoc.

Estructura y arquitectura
- Componentes standalone y feature-first: ubica cada sección del Home dentro de su carpeta (hero, about, services, contact).
- Reutiliza el wrapper de sección: usa app-section para cada bloque de página.
  - Props: id, ariaLabel, variant, padding, container, extraClasses.
  - No envuelvas app-section con divs para añadir fondo/espaciado; usa extraClasses en su lugar.
- Listas reactivas: utiliza @for con track para colecciones y change detection eficiente.

SEO y semántica
- Estructura principal:
  - main: único por página, engloba el contenido principal.
  - section (app-section): cada bloque de la página es una sección.
  - header: encabezados de sección o de página.
  - nav: navegación, CTAs y redes (añade aria-label).
  - article: contenido textual independiente (biografía, explicación).
  - figure + figcaption: elementos visuales con descripción accesible.
  - address: datos de contacto.
- Evita el uso excesivo de div para estructura; prefiere etiquetas semánticas.
- Títulos jerárquicos: un h1 por página, h2 para secciones y h3/h4 según necesidad.

Accesibilidad (A11y)
- Interactivos: focus visible (utiliza utilidades de foco de la marca) y roles/atributos correctos.
- Íconos: provee aria-label cuando sean botones icon-only.
- Formularios: asocia label con campos, aria-label/aria-describedby si corresponde, y estados de error claros.

Estilos y diseño (Tailwind)
- Tokens y utilidades:
  - Fondos: surface-primary, surface-secondary, surface-muted.
  - Marca y acento: clases text-brand-*, text-ui-accent, bg-brand-* cuando existan.
  - Evita hardcodear colores y clases genéricas si el tema ya ofrece utilidades equivalentes.
- Espaciado/gradientes: usa utilidades de Tailwind (p-*, m-*, gap-*, bg-gradient-to-*, from-*, to-*) en el HTML.
- Animaciones/estados: transition-theme o duration-300 por defecto; hover/focus/active definidos.

Convenciones para app-section
- id y ariaLabel: obligatorios para cada sección visible.
- container:
  - true: envuelve el contenido en un contenedor interno.
  - false: las clases de contenedor deben estar en el contenido interno.
- extraClasses: aplica fondos y layouts de la sección (p. ej., gradientes, min-h-screen, py-20).
- padding: evita duplicar padding; coordina padding de app-section con el espaciado interno real.

Servicios (sección y tarjetas)
- Encabezado: header dentro de la sección con h2 y subtítulo.
- Lista semántica: ul con li como contenedor de cada tarjeta; usa role="list" si procede.
- Tarjetas: mantener consistencia visual mediante el ServiceCardComponent; no replicar estilos.

Iconografía
- Usa <ng-icon> con tamaños consistentes (w-5 h-5 por defecto).
- Provee íconos vía provideIcons en el contenedor apropiado (página/feature).
- Colores coherentes con la marca; evita colores fuera de los tokens.

Patrón de extracción de secciones
- Crea un componente standalone por sección (Hero, About, Services, Contact) y consúmelo dentro de app-section.
- Mantén la responsabilidad de datos en el contenedor (feature): provee inputs como arrays o modelos de datos.

Flujo de trabajo para parches (obligatorio)
1) Analiza el impacto: semántica, accesibilidad, tokens y consistencia.
2) Planifica: lista los pasos concretos de cambio, uno por línea.
3) Aplica cambios mínimos: evita ediciones colaterales no requeridas.
4) Valida:
   - SEO: landmarks y jerarquía de títulos.
   - A11y: roles/atributos, enfoque accesible y contraste.
   - Estilos: sin wrappers innecesarios, extraClasses en app-section cuando proceda.
   - Rendimiento: @for con track y CD OnPush donde aplique.
5) Autochequeo rápido:
   - No hay div innecesarios para estructura básica.
   - No hay colores hardcodeados fuera de tokens/utilidades del tema.
   - Los imports de componentes standalone están declarados donde se usan.
   - No hay duplicados de imports o providers.
   - No rompiste el layout responsive (grid/flex y gaps coherentes).

Checklist para enviar cambios
- [ ] Cada sección está envuelta en app-section con id y ariaLabel.
- [ ] No hay wrappers div superfluos alrededor de app-section.
- [ ] Se usan etiquetas semánticas apropiadas (header/nav/article/figure/figcaption/address).
- [ ] A11y validado (focus, labels, aria-* correctos).
- [ ] Estilos basados en utilidades/tokens existentes (surface-*, brand-*, ui-*).
- [ ] Listas con @for tienen track y elementos li cuando semánticamente corresponde.
- [ ] Standalone components importados explícitamente en el contenedor.
- [ ] Sin dependencias no usadas ni imports duplicados.
- [ ] Prueba visual rápida en tamaños sm/md/lg para confirmar el layout.

Notas
- Si necesitas una nueva utilidad de estilo, evalúa primero si existe un token o utility equivalente. Documenta por qué se introduce algo nuevo.
- Mantén los formularios simples y progresivamente mejorables; no ocultes los labels ni los reemplaces solo por placeholders.
