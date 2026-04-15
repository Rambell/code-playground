"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Props {
  title: string
  description: string
  code: string
  children: React.ReactNode
}

export default function ExampleLayout({ title, description, code, children }: Props) {
  return (
    <div style={{ padding: "48px" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "8px" }}>
        {title}
      </h1>
      <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "48px" }}>
        {description}
      </p>

      {/* Demo en vivo */}
      <div style={{
        border: "1px solid #f0f0f0",
        borderRadius: "12px",
        padding: "48px",
        background: "white",
        marginBottom: "24px",
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {children}
      </div>

      {/* Código */}
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #f0f0f0" }}>
        <div style={{
          padding: "12px 20px",
          background: "#f5f5f5",
          borderBottom: "1px solid #f0f0f0",
          fontSize: "0.8rem",
          color: "#999",
          fontWeight: 500
        }}>
          Código
        </div>
        <SyntaxHighlighter
          language="tsx"
          style={oneLight}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.85rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}