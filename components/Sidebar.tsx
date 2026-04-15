"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const nav = [
    {
        category: "CSS",
        items: [
            { label: "Transitions", path: "/examples/css/transitions" },
            { label: "Animations", path: "/examples/css/animations" },
            ]
    },
    {
        category: "GSAP",
        items: [
            { label: "Tween", path: "/examples/gsap/tween" },
            { label: "Timeline", path: "/examples/gsap/timeline" },
            { label: "ScrollTrigger", path: "/examples/gsap/scrolltrigger" },
            { label: "Contador", path: "/examples/gsap/contadores" },
            { label: "Cursor", path: "/examples/gsap/cursor" },
            { label: "Cursor Estela", path: "/examples/gsap/estela" },
            { label: "Smooth Scroll", path: "/examples/gsap/smooth-scroll" },
            { label: "Text Scramble", path: "/examples/gsap/text-scramble" },
            { label: "Text Effects", path: "/examples/gsap/text-effects" },
            { label: "Page Transitions", path: "/examples/gsap/page-transitions" },
            { label: "Parallax", path: "/examples/gsap/parallax" },
            { label: "Proyectos ejemplos", path: "/examples/gsap/projects" },
        ]
    },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string[]>(["CSS", "GSAP"])

  function toggleCategory(category: string) {
    setOpen(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      borderRight: "1px solid #f0f0f0",
      background: "white",
      padding: "24px 0",
      position: "fixed",
      top: 0,
      left: 0,
      overflowY: "auto"
    }}>
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #f0f0f0" }}>
        <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.5px" }}>
          Code Playground
        </span>
      </div>

      <nav style={{ padding: "16px 0" }}>
        {nav.map(section => (
          <div key={section.category}>
            <button
              onClick={() => toggleCategory(section.category)}
              style={{
                width: "100%",
                padding: "8px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}
            >
              {section.category}
              <span style={{ fontSize: "0.7rem" }}>
                {open.includes(section.category) ? "▼" : "▶"}
              </span>
            </button>

            {open.includes(section.category) && (
              <div style={{ marginBottom: "8px" }}>
                {section.items.map(item => (
                  <Link
                    key={item.path}
                    href={item.path}
                    style={{
                      display: "block",
                      padding: "8px 20px 8px 28px",
                      fontSize: "0.9rem",
                      color: pathname === item.path ? "#111" : "#666",
                      textDecoration: "none",
                      background: pathname === item.path ? "#f5f5f5" : "transparent",
                      borderRight: pathname === item.path ? "2px solid #111" : "none",
                      fontWeight: pathname === item.path ? 500 : 400
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}