"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const code = `// Cursor con lag
window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
    ease: "power3.out"
  })
})

// Magnetic button
btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (e.clientX - centerX) * 0.4
  const deltaY = (e.clientY - centerY) * 0.4

  gsap.to(btn, {
    x: deltaX,
    y: deltaY,
    duration: 0.3,
    ease: "power2.out"
  })
})

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
})`

function Demo() {
  const demoRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const demo = demoRef.current
    const cursor = cursorRef.current
    const dot = cursorDotRef.current

    if (!demo || !cursor || !dot) return

    // Cursor con lag
    const onMove = (e: MouseEvent) => {
      const rect = demo.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(dot, { x, y, duration: 0 })
      gsap.to(cursor, { x, y, duration: 0.5, ease: "power3.out" })
    }

    // Cursor hover en botones normales
    const hoverTargets = demo.querySelectorAll(".hover-target")
    hoverTargets.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 3, opacity: 0.3, duration: 0.3 })
      })
      btn.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      })
    })

    // Magnetic buttons
    const magnetBtns = demo.querySelectorAll(".magnetic")
    magnetBtns.forEach(btn => {
      const el = btn as HTMLElement

      el.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (mouseEvent.clientX - centerX) * 0.4
        const deltaY = (mouseEvent.clientY - centerY) * 0.4

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out"
        })

        gsap.to(cursor, { scale: 2.5, opacity: 0.3, duration: 0.3 })
      })

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)"
        })
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      })
    })

    demo.addEventListener("mousemove", onMove)
    return () => demo.removeEventListener("mousemove", onMove)

  }, [])

  return (
    <div
      ref={demoRef}
      style={{
        width: "100%",
        height: "340px",
        position: "relative",
        cursor: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
        overflow: "hidden"
      }}
    >
      {/* Cursor círculo */}
      <div ref={cursorRef} style={{
        position: "absolute",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "1.5px solid #111",
        pointerEvents: "none",
        zIndex: 50,
        top: -16,
        left: -16,
      }} />

      {/* Punto */}
      <div ref={cursorDotRef} style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "#111",
        pointerEvents: "none",
        zIndex: 51,
        top: -2,
        left: -2,
      }} />

      {/* Sección cursor normal */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "1px", textTransform: "uppercase" }}>
          Cursor con hover
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          <button className="hover-target" style={{
            padding: "12px 28px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.95rem",
            cursor: "none",
            fontWeight: 500
          }}>
            Empezar gratis
          </button>
          <button className="hover-target" style={{
            padding: "12px 28px",
            background: "transparent",
            color: "#111",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "0.95rem",
            cursor: "none"
          }}>
            Ver demo →
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", background: "#f0f0f0" }} />

      {/* Sección magnetic */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "1px", textTransform: "uppercase" }}>
          Magnetic buttons
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          <button className="magnetic" style={{
            padding: "12px 28px",
            background: "#534AB7",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.95rem",
            cursor: "none",
            fontWeight: 500
          }}>
            Contactar
          </button>
          <button className="magnetic" style={{
            padding: "12px 28px",
            background: "#1D9E75",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.95rem",
            cursor: "none",
            fontWeight: 500
          }}>
            Ver proyectos
          </button>
        </div>
      </div>

      <p style={{
        position: "absolute",
        bottom: "12px",
        fontSize: "0.75rem",
        color: "#bbb"
      }}>
        Acerca el cursor a los botones morados y verdes
      </p>
    </div>
  )
}

export default function CursorPage() {
  return (
    <ExampleLayout
      title="Cursor + Magnetic Buttons"
      description="Cursor personalizado con lag y botones magnéticos que se atraen al cursor. Dos efectos clave de landings premium."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}