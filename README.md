# Skala — Sitio web

Sitio web de **Skala**, agencia de branding y producción audiovisual en Trujillo, Perú. Construido con [Astro](https://astro.build) (SSR sobre Netlify), React para islas interactivas, Tailwind CSS v4 y Sanity como CMS para portafolio y eventos.

- **Producción:** https://skalaagencia.netlify.app
- **Hosting:** Netlify (adaptador `@astrojs/netlify`, `output: "server"`)
- **CMS:** Sanity (proyecto `6ksx455m`, dataset `production`)

---

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                             |
| :----------------- | :-------------------------------------------------- |
| `npm install`       | Instala dependencias                                 |
| `npm run dev`       | Levanta el servidor local en `localhost:4321`        |
| `npm run build`     | Compila el sitio a `./dist/`                         |
| `npm run preview`   | Sirve el build de producción localmente              |
| `npm run astro ...` | CLI de Astro (`astro add`, `astro check`, etc.)      |

Requiere Node `>=22.12.0`. Variables de entorno en `.env` (ver `.env.example`) — actualmente solo `PUBLIC_GA_MEASUREMENT_ID` (Google Analytics 4). En Netlify se configuran aparte en *Site settings → Environment variables*.

---

## 🗺️ Rutas del sitio

| Ruta | Archivo | Render | Qué hace |
| :--- | :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Estática (`prerender = true`) | Landing principal: Hero, marquee de logos, About, Servicios, Planes, CTA a más servicios, Proceso, Equipo, Contacto, FAQ y CTA final. Todo en una sola página con anclas (`#servicios`, `#planes`, `#proceso`, `#equipo`, `#contacto`). |
| `/servicios` | `src/pages/servicios.astro` | Estática (`prerender = true`) | Catálogo de packs sueltos (web, branding, diseño, video, foto gastronómica/corporativa, cumpleaños, quinceañeras) fuera de los planes mensuales del home, con navegación por categoría (`ServiciosCategoryNav`) y CTA de cotización directa por WhatsApp. Genera JSON-LD `Offer` por pack con precio (soporta rangos "S/ 450 - S/ 900"). |
| `/portafolio` | `src/pages/portafolio.astro` | SSR | Grid filtrable de casos de éxito. Trae proyectos de **Sanity** (`getAllProjects`) y cae a la data estática (`src/data/portafolio.ts`) si Sanity no responde o está vacío. JSON-LD `ItemList`. |
| `/proyecto/[slug]` | `src/pages/proyecto/[slug].astro` | SSR bajo demanda (`prerender = false`) | Detalle de un proyecto del portafolio (galería, descripción, cliente). Devuelve `404` si el slug no existe en Sanity. |
| `/cobertura-eventos` | `src/pages/cobertura-eventos/index.astro` | SSR | Listado de eventos cubiertos por Skala (fotografía/video en vivo), con hero, filtros y grid. Datos desde Sanity (`getAllEvents`). JSON-LD `ItemList`. |
| `/cobertura-eventos/[slug]` | `src/pages/cobertura-eventos/[slug].astro` | Estática por evento (`getStaticPaths`) | Página de detalle de un evento: hero, cliente de galería (carga incremental) y CTA. JSON-LD `Event`. Redirige a `/cobertura-eventos/` si el slug no existe. |
| `/api/events/[slug]/gallery` | `src/pages/api/events/[slug]/gallery.ts` | API route (`prerender = false`) | Endpoint JSON paginado (`offset`/`limit`, máx. 24) que alimenta el scroll infinito de la galería de un evento (`useInfiniteGallery.ts` + `EventGallery.tsx`). Cachea 60s. |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | Endpoint | Sitemap generado dinámicamente. |
| `/robots.txt` | `src/pages/robots.txt.ts` | Endpoint | Robots.txt generado dinámicamente. |

Las anclas del home (`#servicios`, `#planes`, `#proceso`, `#equipo`, `#contacto`) y las rutas anteriores conforman la navegación principal, definida en `src/data/navigation.ts` (estática) y `src/data/navigation-dynamic.ts` (agrega las sub-rutas de "Cobertura Eventos" leyendo los eventos desde Sanity, con fallback a la lista estática si falla).

---

## 📁 Estructura del proyecto

```text
/
├── public/                  # Assets estáticos servidos tal cual (imágenes, favicons, video del hero)
├── src/
│   ├── components/
│   │   ├── landing/         # Secciones del home (Hero, About, Servicios, Planes, Proceso, Team, FAQ, CTA...)
│   │   ├── portfolio/       # Hero, filtros, grid, modal y card de /portafolio y /proyecto
│   │   ├── event/           # Hero, filtros, grid, card y galería de /cobertura-eventos
│   │   ├── gallery/         # Hero y grid de galería reutilizables
│   │   ├── servicios/       # Navegación por categoría de /servicios
│   │   └── shared/          # Nav, Footer, tracking (GA4/WhatsApp), cookie banner, PlanCard, Carousel, Lenis...
│   ├── data/                 # Contenido y config tipados en TS (planes, packs, FAQ, hero, contacto, nav, SEO/schema.org)
│   ├── sanity/                # Clientes y mappers por dominio: category/, event/, project/ (api.ts + *-mapper.ts)
│   ├── hooks/                 # `useInfiniteGallery.ts` — scroll infinito para galerías de eventos
│   ├── lib/                   # `sanity-image.ts` — helper de URLs de imagen de Sanity
│   ├── icons/                  # Wordmark/logotipo (`Logotype.astro`, `SkalaWordmark.tsx`)
│   ├── layouts/
│   │   └── Layout.astro        # Layout raíz: <head> (SEO, OG, JSON-LD, fonts), SiteNav, SiteFooter, tracking, cookie banner
│   ├── pages/                   # Ver tabla de rutas arriba
│   └── styles/
│       └── global.css           # Tokens de diseño (design system), fondo, animaciones globales, scrollbars
├── astro.config.mjs              # Integraciones: React, Sanity, Netlify, Partytown, astro-icon, Tailwind (Vite plugin)
└── package.json
```

**Fuente de datos — patrón CMS con fallback:** Portafolio y Eventos viven en Sanity (`src/sanity/*/api.ts`); las páginas los consumen y, si Sanity no devuelve nada, usan el equivalente estático en `src/data/` (`portafolio.ts`, `event.ts`). Los demás contenidos (planes, packs, FAQ, equipo, hero, proceso) son 100% estáticos en `src/data/*.ts` — no tienen contraparte en el CMS.

---

## 🎨 Design System

Todos los tokens viven en `src/styles/global.css`, declarados como variables CSS en `:root` y expuestos a Tailwind vía `@theme inline` (Tailwind v4, sin `tailwind.config`). Esto genera utilidades `bg-skala-*`, `text-skala-*`, `border-skala-*`, etc. usables directamente en cualquier componente.

### Paleta de color

Tema oscuro fijo (no hay modo claro): azul profundo de fondo + acento cian eléctrico.

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--bg` | `#04142e` | Fondo base |
| `--bg-soft` | `#071a3a` | Fondo, transición inferior del gradiente de `body` |
| `--bg-deep` | `#020a1a` | Fondo, transición superior del gradiente de `body` |
| `--surface` / `--surface-strong` / `--surface-glass` | `rgba(8,24,52,…)` | Paneles y cards sobre el fondo (glassmorphism, distintas opacidades) |
| `--border` / `--border-strong` | `rgba(174,224,255,0.11 / 0.2)` | Bordes sutiles sobre superficies oscuras |
| `--text` | `#f4f8ff` | Texto principal (sobre fondo oscuro) |
| `--text-secondary` | `#04142e` | Texto sobre superficies claras/de acento (p. ej. botón primario) |
| `--muted` | `rgba(214,232,255,0.68)` | Texto secundario / descripciones |
| `--accent` | `#5cd8fc` | Color de marca — CTAs primarios, íconos, subrayados, glow |
| `--accent-2` | `#1ea3e8` | Acento secundario (degradados, hover) |
| `--accent-soft` | `rgba(92,216,252,0.14)` | Fondos sutiles con tinte de acento |

Los planes (`PlanCard`) y algunos packs traen su **propio par `{ bg, text }`** por plan (definidos en `src/data/plans.ts` / `servicePacks.ts`), rompiendo la paleta oscura a propósito para diferenciar tiers; `PlanCard.astro` calcula si ese fondo es claro u oscuro (`isLightBg`) para ajustar automáticamente la opacidad de textos e íconos de check.

### Tipografía

Dos familias vía Google Fonts (preconectadas + precargadas sin bloquear el render, ver `Layout.astro`):

- **`--font-display` → "Unbounded"** (400–900): títulos, precios, botones, labels de sección. Siempre en mayúsculas con `tracking` amplio para labels, o con `tracking` muy negativo (`-0.04em` a `-0.08em`) y peso alto en headings grandes.
- **`--font-sans` → "Instrument Sans"** (400–700, itálica 400): body copy, párrafos, texto de UI.

Patrones recurrentes de tamaño (Tailwind arbitrario, sin escala fija — cada sección ajusta con `clamp()` para fluidez):
- Headings de sección: `font-display`, tamaños `clamp(...)`, `leading` ajustado (0.86–1.35), `tracking` negativo.
- Micro-labels (kicker, badges, período de precio): `text-[0.62rem]`–`text-[0.74rem]`, `uppercase`, `tracking-[0.16em]`–`tracking-[0.28em]`.
- Cuerpo: `text-skala-muted`, `leading-7`/`leading-8`.

### Radios, superficies y sombras

- Radios grandes y consistentes: `rounded-full` en botones/pills, `rounded-[26px]`–`rounded-[42px]` en cards y paneles grandes (nunca `rounded-lg`/`rounded-xl` genéricos de Tailwind).
- Superficies "glass": fondo semitransparente (`--surface*`) + `border` sutil + `shadow-(--shadow)` (`0 24px 70px rgba(0,22,52,0.34)`) + a veces `shadow-inset` (`shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`) para un highlight superior de 1px.
- `--shadow-accent` para elevar elementos con acento (CTAs primarios).
- Fondo global compuesto por 2 radiales + 1 gradiente lineal (`body`), más una grid de líneas de 56px con máscara de desvanecido (`body::before`) — el "ambient backdrop" de marca.

### Botones (CTA)

Patrón único reutilizado en Hero, PlanCard y CTAs de sección:
```
inline-flex items-center gap-3 rounded-full px-6 py-4
font-display text-[0.74rem] uppercase tracking-[0.16em]
transition duration-200 hover:-translate-y-0.5 hover:scale-[1.015]
focus-visible:ring-2 focus-visible:ring-skala-accent/60 active:translate-y-px
```
- **Primario:** fondo `--accent` sólido, texto `--text-secondary` (oscuro sobre cian), `shadow-accent`.
- **Secundario:** borde `--border-strong`, fondo casi transparente (`bg-white/3`), hover sube opacidad y aclara el borde con el acento.
- Ícono a la derecha del label, con `group-hover:translate-x-0.5 group-hover:-translate-y-0.5` (sensación de "salto" hacia la esquina superior derecha).

### Movimiento y animación

- **Scroll reveal:** cualquier elemento con `data-reveal` empieza oculto/desplazado (`opacity:0; translateY(24px) scale(0.985)`) y se revela con `IntersectionObserver` (`RevealScript.astro`, umbral 15%) añadiendo `.is-visible`; soporta `--reveal-delay` por elemento para escalonar listas. El contenido *above-the-fold* (Hero) usa `animation` CSS pura en vez de este patrón, para no depender de que el script cargue antes del primer pintado (crítico para LCP).
- Curva de easing compartida: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
- Keyframes globales reutilizables en `global.css`: `marquee` (loop del `MarqueeStrip`), `drift`/`floatPanel` (blobs decorativos flotantes), `pulseGlow` (brillo pulsante en acentos), `shineSweep`/`scanLine` (barridos de luz sobre superficies).
- **Scroll suave:** Lenis (`LenisScroll.tsx`, isla React con `client:idle`) sobre `html { scroll-behavior: smooth }`.
- GSAP + `@gsap/react` disponibles para animaciones más complejas puntuales (equipo, carousels).
- **Accesibilidad de movimiento:** todo el sistema respeta `prefers-reduced-motion: reduce` — se neutralizan duraciones de animación/transición globalmente (`global.css`) y cada componente con animación a medida (Hero, reveal) repite su propio guard.

### Componentes UI reutilizables clave

| Componente | Dónde | Rol |
| :--- | :--- | :--- |
| `SectionLabel.astro` | Toda sección del home | Kicker con línea + texto uppercase, siempre con `data-reveal` |
| `PlanCard.astro` | `#planes` (home) y cada categoría de `/servicios` | Card de precio parametrizable por color (`plan.colors`), única fuente de verdad del look de "plan" |
| `SiteNav.astro` / `SiteFooter.astro` | `Layout.astro` | Navegación fija (con soporte `isStatic` para variantes) y footer, ambos leen `navigation.ts` |
| `AmbientBackdrop.astro` | `Layout.astro` (global) | Blobs/gradientes decorativos de fondo, fijos detrás de todo el contenido |
| `RevealScript.astro` | `Layout.astro` (global) | Motor del scroll-reveal (`data-reveal`) para todo el sitio |
| `ModalPortfolio.tsx` | `/portafolio` | Modal (isla React) con carrusel para el detalle rápido de un proyecto |
| `EventGallery.tsx` + `useInfiniteGallery.ts` | `/cobertura-eventos/[slug]` | Scroll infinito contra `/api/events/[slug]/gallery` |

### Convenciones de código relacionadas al diseño

- **Tailwind v4 sin config file:** los tokens se definen en CSS (`@theme inline` en `global.css`), no en `tailwind.config.js`. Para agregar un color/token nuevo del sistema, se edita ahí.
- **Utilidades arbitrarias sobre escala por defecto:** tamaños de fuente, radios y espaciados casi siempre usan valores arbitrarios (`text-[1.08rem]`, `rounded-[42px]`) en vez de la escala estándar de Tailwind, porque el diseño está afinado a medida sección por sección.
- **`class:list`** de Astro para variantes condicionales (ver botones del Hero, plan features).
- **Tracking de interacción vía atributos `data-*`**, no lógica embebida: `data-ga-click` + `data-ga-location/-label/-target` (evento GA4 `cta_click`, manejado por `CtaTracking.astro`) y un patrón equivalente en `WhatsAppTracking.astro` (evento `click_whatsapp`) — separados a propósito para no mezclar "mostró interés" con "llegó a WhatsApp" en las métricas.
- **CSS scoped por componente** cuando la animación es muy específica de una sección (ver `<style>` al final de `HeroSection.astro`); lo compartido/global vive en `global.css`.

---

## 🔌 Integraciones

- **Sanity** (`@sanity/astro`, dataset `production`, proyecto `6ksx455m`, `useCdn: false`): fuente de contenido para portafolio y eventos. Cada dominio (`category`, `event`, `project`) tiene su `api.ts` (queries) y `*-mapper.ts` (adapta el documento de Sanity a los tipos que consume la UI) en `src/sanity/`.
- **React** (`@astrojs/react`): usado solo para islas puntuales que necesitan estado/interactividad (modal de portafolio, galería infinita, Lenis, wordmark animado, carousels) — el resto del sitio es Astro estático/SSR.
- **Netlify** (`@astrojs/netlify`, `output: "server"`): adaptador de despliegue; permite las rutas SSR bajo demanda (`/proyecto/[slug]`, API de galería).
- **Partytown**: corre Google Analytics (`gtag.js`) en un web worker en vez del hilo principal, reenviando solo `dataLayer.push`.
- **astro-icon**: íconos SVG optimizados; `react-icons` (Feather, `Fi*`) para íconos usados desde componentes React/props tipadas.
- **Imágenes de Sanity**: dominio `cdn.sanity.io` permitido en `image.domains`/`remotePatterns` de `astro.config.mjs`; helper de URLs en `src/lib/sanity-image.ts`.

## 🔍 SEO

Cada página arma su propio `title`, `description`, `canonicalUrl`, `keywords` y bloques `JSON-LD` (Organization, WebSite, ItemList, Event, Offer) definidos junto a la data de esa página o en `src/data/organization.ts` / `faq.ts`, y los pasa como props a `Layout.astro`, que centraliza meta tags, Open Graph, Twitter Card, favicons e inyección del `<script type="application/ld+json">`. `sitemap.xml.ts` y `robots.txt.ts` se generan como endpoints (no archivos estáticos) para poder incluir contenido dinámico de Sanity.

---

## 👀 Más información

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Tailwind CSS v4](https://tailwindcss.com/docs)
- [Documentación de Sanity](https://www.sanity.io/docs)
