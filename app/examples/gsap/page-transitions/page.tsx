"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const code = `// Al salir de la página
function transitionOut(onComplete: () => void) {
  gsap.to(overlay, {
    scaleY: 1,
    duration: 0.5,
    ease: "power2.inOut",
    transformOrigin: "bottom",
    onComplete
  })
}

// Al entrar a la nueva página
function transitionIn() {
  gsap.to(overlay, {
    scaleY: 0,
    duration: 0.5,
    ease: "power2.inOut",
    transformOrigin: "top",
  })
}`

const pages = [
  {
    label: "Inicio",
    bg: "#fafafa",
    color: "#111",
    title: "Bienvenido",
    sub: "Esta es la página de inicio"
  },
  {
    label: "Features",
    bg: "#534AB7",
    color: "white",
    title: "Features",
    sub: "Todo lo que necesitas"
  },
  {
    label: "Precios",
    bg: "#111",
    color: "white",
    title: "Precios simples",
    sub: "Sin sorpresas"
  },
  {
    label: "Contacto",
    bg: "#1D9E75",
    color: "white",
    title: "Hablemos",
    sub: "Estamos para ayudarte"
  },
]

function Demo() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  function goTo(index: number) {
    if (isAnimating || index === current) return
    setIsAnimating(true)

    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    // Fase 1: overlay entra desde abajo
    gsap.set(overlay, { scaleY: 0, transformOrigin: "bottom" })
    gsap.to(overlay, {
      scaleY: 1,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {

        // Cambiar contenido mientras overlay cubre todo
        setCurrent(index)

        // Fase 2: overlay sale hacia arriba
        gsap.set(overlay, { transformOrigin: "top" })
        gsap.to(overlay, {
          scaleY: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {

            // Animar contenido nuevo
            gsap.from(content, {
              y: 20,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out"
            })

            setIsAnimating(false)
          }
        })
      }
    })
  }

  const page = pages[current]

  return (
    <div style={{
      width: "100%",
      height: "300px",
      position: "relative",
      overflow: "hidden",
      borderRadius: "8px",
      background: page.bg,
      transition: "background 0s"
    }}>

      {/* Overlay de transición */}
      <div ref={overlayRef} style={{
        position: "absolute",
        inset: 0,
        background: "#111",
        zIndex: 10,
        transform: "scaleY(0)",
        transformOrigin: "bottom"
      }} />

      {/* Contenido */}
      <div ref={contentRef} style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px"
      }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: page.color,
          letterSpacing: "-0.5px"
        }}>
          {page.title}
        </h2>
        <p style={{ color: page.color, opacity: 0.6, fontSize: "0.95rem" }}>
          {page.sub}
        </p>
      </div>

      {/* Nav */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        zIndex: 5
      }}>
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: current === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
              color: current === i ? "#111" : "white",
              cursor: isAnimating ? "not-allowed" : "pointer",
              fontSize: "0.8rem",
              fontWeight: current === i ? 600 : 400,
              backdropFilter: "blur(8px)"
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

    </div>
  )
}

export default function PageTransitionsPage() {
  return (
    <ExampleLayout
      title="Page Transitions"
      description="Transiciones suaves entre páginas con un overlay animado. Lo que separa una web normal de una de agencia top."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}