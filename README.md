# Code Playground 🎮

Biblioteca interactiva de ejemplos de código con demos en vivo. Construida con Next.js, TypeScript y GSAP.

## Demo

[Ver en vivo →](https://code-playground-livid.vercel.app/)

## ¿Qué es esto?

Un playground personal para aprender y referenciar efectos de animación web. Cada ejemplo muestra el demo funcionando en vivo y el código fuente lado a lado.

## Ejemplos disponibles

### CSS
- **Transitions** → Transiciones suaves con cubic-bezier
- **Animations** → Animaciones infinitas con @keyframes (float, pulse, spin)

### GSAP
- **Tween** → gsap.from(), gsap.to(), gsap.fromTo()
- **Timeline** → Animaciones encadenadas con overlaps
- **ScrollTrigger** → Animaciones activadas por scroll con scrub
- **Contadores** → Números que suben al hacer scroll
- **Cursor + Magnetic** → Cursor personalizado con lag y botones magnéticos
- **Estela de colores** → Partículas de colores que siguen al cursor
- **Smooth Scroll** → Scroll cinematográfico con interpolación
- **Text Scramble** → Texto que se revela con caracteres aleatorios
- **Page Transitions** → Transiciones entre páginas con overlay animado
- **Text Effects** → Typewriter con cursor parpadeante + letras que caen
- **Parallax** → Múltiples capas a distintas velocidades con el mouse

### Proyectos
- **Flowdesk** → Landing de SaaS de productividad (light mode)
- **Nexus AI** → Landing de startup de IA (dark mode premium)

## Stack

- [Next.js 16](https://nextjs.org/) con App Router
- [TypeScript](https://www.typescriptlang.org/)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [Tailwind CSS](https://tailwindcss.com/)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/code-playground.git

# Entrar al proyecto
cd code-playground

# Instalar dependencias
npm install

# Arrancar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
app/
  layout.tsx              → Layout principal con sidebar
  page.tsx                → Página de inicio
  projects/
    page.tsx              → Galería de proyectos
  examples/
    css/
      transitions/        → Ejemplo de CSS transitions
      animations/         → Ejemplo de CSS animations
    gsap/
      tween/              → Ejemplo de GSAP tween
      timeline/           → Ejemplo de GSAP timeline
      scrolltrigger/      → Ejemplo de ScrollTrigger
      contadores/         → Ejemplo de contadores animados
      cursor/             → Ejemplo de cursor + magnetic buttons
      estela/             → Ejemplo de estela de colores
      smooth-scroll/      → Ejemplo de smooth scroll
      text-scramble/      → Ejemplo de text scramble
      page-transitions/   → Ejemplo de page transitions
      text-effects/       → Ejemplo de typewriter + letras que caen
      parallax/           → Ejemplo de parallax avanzado
components/
  Sidebar.tsx             → Navegación lateral
  ExampleLayout.tsx       → Layout de cada ejemplo (demo + código)
```

## Cómo agregar un nuevo ejemplo

1. Crea la carpeta en `app/examples/[tecnologia]/[nombre]/`
2. Agrega `page.tsx` con el componente `ExampleLayout`
3. Agrega el item en `components/Sidebar.tsx`

```tsx
// Estructura básica de un ejemplo
export default function MiEjemploPage() {
  return (
    <ExampleLayout
      title="Nombre del ejemplo"
      description="Descripción de qué hace y cuándo usarlo."
      code={`// código aquí`}
    >
      <Demo />
    </ExampleLayout>
  )
}
```

## Roadmap

- [ ] CSS avanzado → Grid animations, clip-path
- [ ] GSAP
- [ ] Más proyectos completos

## Autor
Matías Ramírez
