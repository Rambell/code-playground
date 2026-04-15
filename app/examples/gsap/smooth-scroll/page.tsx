"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const code = `// ScrollSmoother es un plugin de GSAP Club (de pago)
// Esta es la versión manual con la misma sensación

let current = 0   // scroll actual
let target = 0    // scroll objetivo
let ease = 0.08   // qué tan suave (menor = más suave)

window.addEventListener("scroll", () => {
  target = window.scrollY
})

function smoothLoop() {
  // Interpolar entre posición actual y objetivo
  current += (target - current) * ease
  
  // Mover el contenido
  gsap.set(content, { y: -current })
  
  requestAnimationFrame(smoothLoop)
}

smoothLoop()`

function Demo() {
  const demoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const demo = demoRef.current
    const content = contentRef.current
    if (!demo || !content) return

    let current = 0
    let target = 0
    let rafId: number
    const ease = 0.08

    const onScroll = () => {
      target = demo.scrollTop
    }

    const loop = () => {
      current += (target - current) * ease
      gsap.set(content, { y: -current })
      rafId = requestAnimationFrame(loop)
    }

    demo.addEventListener("scroll", onScroll)
    rafId = requestAnimationFrame(loop)

    return () => {
      demo.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const sections = [
    { bg: "#534AB7", label: "Sección 1", sub: "Scroll hacia abajo" },
    { bg: "#1D9E75", label: "Sección 2", sub: "Sientes la diferencia?" },
    { bg: "#D85A30", label: "Sección 3", sub: "Así se ven las webs top" },
    { bg: "#111", label: "Sección 4", sub: "Smooth como la seda" },
  ]

  return (
    <div
      ref={demoRef}
      style={{
        width: "100%",
        height: "300px",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <div
        ref={contentRef}
        style={{
          willChange: "transform",
        }}
      >
        {sections.map((s, i) => (
          <div key={i} style={{
            height: "300px",
            background: s.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "white" }}>
              {s.label}
            </span>
            <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SmoothScrollPage() {
  return (
    <ExampleLayout
      title="Smooth Scroll"
      description="Scroll suave y cinematográfico. La diferencia entre una web normal y una de agencia premium."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}