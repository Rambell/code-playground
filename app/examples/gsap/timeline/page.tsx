"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const code = `const tl = gsap.timeline()

// Las animaciones se encadenan en secuencia
tl.from(title, { y: -30, opacity: 0, duration: 0.6 })
  .from(subtitle, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(button, { scale: 0.8, opacity: 0, duration: 0.4 }, "-=0.2")

// "-=0.3" significa que empieza 0.3s ANTES de que termine la anterior
// Eso crea el efecto de overlap que se ve fluido y profesional`

function Demo() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  function play() {
    const tl = gsap.timeline()
    tl.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .from(subtitleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.2")
  }

  useEffect(() => { play() }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
      <div ref={containerRef} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <div ref={titleRef} style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
          Tu producto aquí
        </div>
        <div ref={subtitleRef} style={{ fontSize: "0.95rem", color: "#666" }}>
          La descripción que convierte visitantes en clientes
        </div>
        <div ref={buttonRef} style={{
          marginTop: "8px",
          padding: "10px 28px",
          background: "#111",
          color: "white",
          borderRadius: "8px",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          display: "inline-block"
        }}>
          Empezar gratis
        </div>
      </div>

      <button
        onClick={play}
        style={{
          padding: "8px 20px",
          borderRadius: "8px",
          border: "1px solid #e5e5e5",
          background: "transparent",
          color: "#666",
          cursor: "pointer",
          fontSize: "0.85rem"
        }}
      >
        ▶ Reproducir de nuevo
      </button>
    </div>
  )
}

export default function TimelinePage() {
  return (
    <ExampleLayout
      title="GSAP Timeline"
      description="Encadena animaciones en secuencia con control total. El overlap con '-=0.3' es lo que hace que se vea fluido."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}