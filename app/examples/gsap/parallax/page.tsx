"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const code = `// Parallax con mouse
const x = (e.clientX - centerX) / width - 0.5
const y = (e.clientY - centerY) / height - 0.5

// Cada capa a distinta velocidad
gsap.to(bgLayer,   { x: x * 20, y: y * 20 }) // lento
gsap.to(midLayer,  { x: x * 50, y: y * 50 }) // medio
gsap.to(frontLayer,{ x: x * 80, y: y * 80 }) // rápido`

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(bgRef.current, {
        x: x * 20, y: y * 20,
        duration: 1, ease: "power2.out"
      })
      gsap.to(circleRef.current, {
        x: x * 50, y: y * 50,
        duration: 0.8, ease: "power2.out"
      })
      gsap.to(midRef.current, {
        x: x * 80, y: y * 80,
        duration: 0.6, ease: "power2.out"
      })
      gsap.to(textRef.current, {
        x: x * 30, y: y * 30,
        duration: 0.5, ease: "power2.out"
      })
    }

    const onLeave = () => {
      gsap.to([bgRef.current, circleRef.current, midRef.current, textRef.current], {
        x: 0, y: 0, duration: 1, ease: "power2.out"
      })
    }

    container.addEventListener("mousemove", onMove)
    container.addEventListener("mouseleave", onLeave)
    return () => {
      container.removeEventListener("mousemove", onMove)
      container.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>

      {/* Demo mouse parallax */}
      <p style={{ fontSize: "0.75rem", color: "#aaa", textAlign: "center", letterSpacing: "1px", textTransform: "uppercase" }}>
        Mueve el cursor dentro del área
      </p>

      <div ref={containerRef} style={{
        height: "400px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
      }}>
        <div ref={bgRef} style={{
          position: "absolute",
          inset: "-10%",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          zIndex: 0
        }} />

        <div ref={circleRef} style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(83,74,183,0.6) 0%, transparent 70%)",
          top: "0%",
          right: "-10%",
          zIndex: 1
        }} />

        <div ref={midRef} style={{
          position: "absolute",
          inset: 0,
          zIndex: 2
        }}>
          {[
            { size: 70, color: "rgba(83,74,183,0.7)", top: "15%", left: "8%" },
            { size: 45, color: "rgba(29,158,117,0.7)", top: "55%", left: "78%" },
            { size: 90, color: "rgba(216,90,48,0.5)", top: "65%", left: "15%" },
            { size: 30, color: "rgba(255,255,255,0.2)", top: "25%", left: "60%" },
          ].map((shape, i) => (
            <div key={i} style={{
              position: "absolute",
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: shape.color,
              top: shape.top,
              left: shape.left,
            }} />
          ))}
        </div>

        <div ref={textRef} style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}>
          <h2 style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "white",
            letterSpacing: "-1px",
            margin: 0,
            textAlign: "center"
          }}>
            Profundidad real
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.9rem",
            margin: 0
          }}>
            Cada capa a su propia velocidad
          </p>
        </div>
      </div>

    </div>
  )
}

export default function ParallaxPage() {
  return (
    <ExampleLayout
      title="Parallax Avanzado"
      description="Múltiples capas moviéndose a distintas velocidades según el mouse. El efecto que da profundidad y dimensión a las landings."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}