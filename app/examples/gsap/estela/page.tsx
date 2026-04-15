"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const code = `window.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div")
  
  // Color aleatorio en cada partícula
  const hue = Math.random() * 360
  particle.style.cssText = \`
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: hsl(\${hue}, 80%, 60%);
    left: \${e.clientX}px;
    top: \${e.clientY}px;
    pointer-events: none;
    z-index: 9999;
  \`
  document.body.appendChild(particle)

  // Animar y eliminar
  gsap.to(particle, {
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 60,
    opacity: 0,
    scale: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => particle.remove()
  })
})`

function Demo() {
  const demoRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const demo = demoRef.current
    const cursor = cursorRef.current
    if (!demo || !cursor) return

    let hue = 0

    const onMove = (e: MouseEvent) => {
      const rect = demo.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Cursor principal
      gsap.to(cursor, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out"
      })

      // Crear partícula
      hue = (hue + 8) % 360
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: hsl(${hue}, 80%, 60%);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 10;
        transform: translate(-50%, -50%);
      `
      demo.appendChild(particle)

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => particle.remove()
      })
    }

    demo.addEventListener("mousemove", onMove)
    return () => {
      demo.removeEventListener("mousemove", onMove)
    }

  }, [])

  return (
    <div
      ref={demoRef}
      style={{
        width: "100%",
        height: "300px",
        position: "relative",
        cursor: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        overflow: "hidden",
        background: "#111",
        borderRadius: "8px"
      }}
    >
      {/* Cursor */}
      <div ref={cursorRef} style={{
        position: "absolute",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "white",
        pointerEvents: "none",
        zIndex: 50,
        top: -6,
        left: -6,
      }} />

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", position: "relative", zIndex: 1 }}>
        Mueve el cursor aquí dentro
      </p>
    </div>
  )
}

export default function EstelaPage() {
  return (
    <ExampleLayout
      title="Estela de colores"
      description="Partículas de colores que siguen al cursor. Cada partícula tiene un tono distinto creando un arcoíris en movimiento."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}