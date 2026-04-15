"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useState } from "react"

const code = `const [active, setActive] = useState(false)

<div
  onClick={() => setActive(!active)}
  style={{
    width: "80px",
    height: "80px",
    borderRadius: active ? "50%" : "12px",
    background: active ? "#534AB7" : "#1D9E75",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
  }}
/>`

function Demo() {
  const [active, setActive] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <div
        onClick={() => setActive(!active)}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: active ? "50%" : "12px",
          background: active ? "#534AB7" : "#1D9E75",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      />
      <p style={{ fontSize: "0.85rem", color: "#999" }}>
        Click para animar
      </p>
    </div>
  )
}

export default function TransitionsPage() {
  return (
    <ExampleLayout
      title="CSS Transitions"
      description="Transiciones suaves entre estados usando cubic-bezier para controlar la curva de velocidad."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}