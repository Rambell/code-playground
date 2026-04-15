"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const code = `gsap.registerPlugin(ScrollTrigger)

// Se activa cuando el elemento entra en pantalla
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: "top bottom",
    end: "top 30%",
    scrub: true,
  },
  opacity: 0,
  y: 60,
})`

function Demo() {
  const boxesRef = useRef<HTMLDivElement>(null)

  function play() {
    const boxes = boxesRef.current?.querySelectorAll(".st-box")
    if (!boxes) return
    gsap.killTweensOf(boxes)
    gsap.fromTo(boxes,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out"
      }
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => play(), 200)
    return () => clearTimeout(timer)
  }, [])

  const items = [
    { color: "#534AB7", label: "trigger" },
    { color: "#1D9E75", label: "stagger" },
    { color: "#D85A30", label: "scrub" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
      <div ref={boxesRef} style={{ display: "flex", gap: "24px" }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div className="st-box" style={{
              width: "70px",
              height: "70px",
              borderRadius: "14px",
              background: item.color
            }} />
            <span style={{ fontSize: "0.75rem", color: "#999" }}>{item.label}</span>
          </div>
        ))}
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

      <p style={{ fontSize: "0.8rem", color: "#aaa", textAlign: "center", maxWidth: "320px" }}>
        En una landing real esto se activa al hacer scroll. Aquí simulamos la animación con el botón.
      </p>
    </div>
  )
}

export default function ScrollTriggerPage() {
  return (
    <ExampleLayout
      title="GSAP ScrollTrigger"
      description="Activa animaciones basadas en el scroll. Con scrub: true la animación sigue el ritmo exacto del scroll."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}