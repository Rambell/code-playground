"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef, useState } from "react"

const code = `class TextScramble {
  el: HTMLElement
  chars = "!<>-_\\/[]{}—=+*^?#@$%&"
  
  setText(newText: string) {
    const length = newText.length
    let frame = 0

    const update = () => {
      let output = ""

      for (let i = 0; i < length; i++) {
        if (i < frame / 3) {
          // Letra resuelta
          output += newText[i]
        } else {
          // Letra aleatoria
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      el.innerText = output

      if (frame < length * 3) {
        frame++
        requestAnimationFrame(update)
      }
    }

    update()
  }
}`

class TextScramble {
  el: HTMLElement
  chars: string
  frameRequest: number = 0

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#@$%&"
  }

setText(newText: string) {
  const length = newText.length
  const speed = 8  // ← aquí arriba, antes de todo
  let frame = 0

  const update = () => {
    let output = ""

    for (let i = 0; i < length; i++) {
      if (i < frame / speed) {
        output += newText[i]
      } else {
        output += this.chars[Math.floor(Math.random() * this.chars.length)]
      }
    }

    this.el.innerText = output

    if (frame < length * speed) {
      frame++
      this.frameRequest = requestAnimationFrame(update)
    }
  }

    cancelAnimationFrame(this.frameRequest)
    update()
    }
}

const phrases = [
  "Bienvenido al futuro",
  "Diseño que convierte",
  "Animaciones que venden",
  "Tu SaaS empieza aquí",
  "Código que impresiona",
]

function Demo() {
  const textRef = useRef<HTMLDivElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!textRef.current) return
    scramblerRef.current = new TextScramble(textRef.current)
    scramblerRef.current.setText(phrases[0])
  }, [])

  function scrambleTo(index: number) {
    if (!scramblerRef.current) return
    setActive(index)
    scramblerRef.current.setText(phrases[index])
  }

  function scrambleRandom() {
    const next = (active + 1) % phrases.length
    scrambleTo(next)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px",
      width: "100%"
    }}>

      {/* Texto scramble */}
      <div
        ref={textRef}
        style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#111",
          fontFamily: "monospace",
          minHeight: "2.5rem",
          textAlign: "center"
        }}
      />

      {/* Botones de frases */}
      <div style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {phrases.map((phrase, i) => (
          <button
            key={i}
            onClick={() => scrambleTo(i)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              background: active === i ? "#111" : "transparent",
              color: active === i ? "white" : "#666",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: active === i ? 500 : 400,
              transition: "all 0.2s"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={scrambleRandom}
        style={{
          padding: "10px 28px",
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
          background: "transparent",
          color: "#111",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 500
        }}
      >
        ▶ Siguiente frase
      </button>
    </div>
  )
}

export default function TextScramblePage() {
  return (
    <ExampleLayout
      title="Text Scramble"
      description="Texto que se revela con caracteres aleatorios. Efecto hacker muy usado en landings de tech, crypto y agencias."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}