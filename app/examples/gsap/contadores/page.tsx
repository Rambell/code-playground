"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const code = `gsap.to(counter, {
  scrollTrigger: {
    trigger: counter,
    start: "top 80%",
  },
  innerText: 10000,
  duration: 2,
  ease: "power2.out",
  snap: { innerText: 1 }, // solo números enteros
  onUpdate: function() {
    // formato con separador de miles
    this.targets()[0].innerText = 
      Math.ceil(this.targets()[0].innerText)
        .toLocaleString() + suffix
  }
})`

const stats = [
  { value: 10000, suffix: "+", label: "Clientes activos" },
  { value: 99, suffix: "%", label: "Satisfacción" },
  { value: 4800, suffix: "+", label: "Proyectos entregados" },
  { value: 12, suffix: "M", label: "Tareas completadas" },
]

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counters = containerRef.current?.querySelectorAll(".counter-value")
    if (!counters) return

    const timer = setTimeout(() => {
      counters.forEach((counter, i) => {
        const target = stats[i].value
        const suffix = stats[i].suffix

        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              const el = this.targets()[0] as HTMLElement
              const current = Math.ceil(parseFloat(el.innerText))
              el.innerText = current.toLocaleString() + suffix
            }
          }
        )
      })

      ScrollTrigger.refresh()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minWidth: "120px"
        }}>
          <span
            className="counter-value"
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#111",
              lineHeight: 1
            }}
          >
            0
          </span>
          <span style={{
            fontSize: "0.85rem",
            color: "#999",
            fontWeight: 400
          }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ContadoresPage() {
  return (
    <ExampleLayout
      title="Contadores animados"
      description="Números que suben al cargarse. Genera credibilidad instantánea en secciones de stats."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}