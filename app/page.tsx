import Link from "next/link"

export default function Home() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-1px" }}>
        Code Playground
      </h1>
      <p style={{ color: "#666" }}>
        Selecciona un ejemplo del sidebar para empezar
      </p>
      <Link href="/examples/css/transitions" style={{ color: "#534AB7", fontSize: "0.9rem" }}>
        Ver primer ejemplo →
      </Link>
    </div>
  )
}