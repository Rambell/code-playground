"use client"

import ExampleLayout from "@/components/ExampleLayout"

const code = `/* CSS */
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50%       { transform: translateY(-20px) }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1 }
  50%       { transform: scale(1.15); opacity: 0.7 }
}

@keyframes spin {
  from { transform: rotate(0deg) }
  to   { transform: rotate(360deg) }
}

/* Uso */
<div style={{ animation: "float 3s ease-in-out infinite" }} />
<div style={{ animation: "pulse 2s ease-in-out infinite" }} />
<div style={{ animation: "spin 1.5s linear infinite" }} />`

const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.7; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const animations = [
  {
    label: "float",
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "12px",
      background: "#534AB7",
      animation: "float 3s ease-in-out infinite"
    }
  },
  {
    label: "pulse",
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#1D9E75",
      animation: "pulse 2s ease-in-out infinite"
    }
  },
  {
    label: "spin",
    style: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      background: "#D85A30",
      animation: "spin 1.5s linear infinite"
    }
  }
]

function Demo() {
  return (
    <>
      <style>{keyframes}</style>
      <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
        {animations.map(a => (
          <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={a.style as React.CSSProperties} />
            <span style={{ fontSize: "0.8rem", color: "#999" }}>{a.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default function AnimationsPage() {
  return (
    <ExampleLayout
      title="CSS Animations"
      description="Animaciones infinitas con @keyframes. Float, pulse y spin son las tres más usadas en landings."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}