"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const code = `// Typewriter
function typeWriter(el, text, speed = 50) {
  let i = 0
  el.innerText = ""
  const interval = setInterval(() => {
    el.innerText += text[i]
    i++
    if (i >= text.length) clearInterval(interval)
  }, speed)
}

// Letras que caen
function splitLetters(el) {
  const letters = el.innerText.split("")
  el.innerHTML = letters
    .map(l => \`<span>\${l === " " ? "&nbsp;" : l}</span>\`)
    .join("")

  gsap.from(el.querySelectorAll("span"), {
    y: -60,
    opacity: 0,
    duration: 0.5,
    stagger: 0.04,
    ease: "back.out(1.7)"
  })
}`

const typewriterPhrases = [
  "Diseño que convierte.",
  "Código que impresiona.",
  "Landings que se venden.",
  "Tu SaaS empieza aquí.",
]

function TypewriterDemo() {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const phraseIndex = useRef(0)
  const isDeleting = useRef(false)
  const currentText = useRef("")

  useEffect(() => {
    const el = textRef.current
    const cursor = cursorRef.current
    if (!el || !cursor) return

    // Cursor parpadeante
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "none"
    })

    let timeout: ReturnType<typeof setTimeout>

    function type() {
      const phrase = typewriterPhrases[phraseIndex.current]
      const speed = isDeleting.current ? 40 : 80

      if (!isDeleting.current) {
        currentText.current = phrase.slice(0, currentText.current.length + 1)
      } else {
        currentText.current = phrase.slice(0, currentText.current.length - 1)
      }

      if (!el) return
        el.innerText = currentText.current

      if (!isDeleting.current && currentText.current === phrase) {
        timeout = setTimeout(() => {
          isDeleting.current = true
          type()
        }, 1500)
        return
      }

      if (isDeleting.current && currentText.current === "") {
        isDeleting.current = false
        phraseIndex.current = (phraseIndex.current + 1) % typewriterPhrases.length
      }

      timeout = setTimeout(type, speed)
    }

    type()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "16px", letterSpacing: "1px", textTransform: "uppercase" }}>
        Typewriter
      </p>
      <h2 style={{
        fontSize: "clamp(1.2rem, 3vw, 2rem)",
        fontWeight: 700,
        letterSpacing: "-0.5px",
        color: "#111",
        minHeight: "2.5rem"
      }}>
        <span ref={textRef} />
        <span ref={cursorRef} style={{ borderRight: "3px solid #534AB7", marginLeft: "2px" }}>&nbsp;</span>
      </h2>
    </div>
  )
}

function FallingLettersDemo() {
  const textRef = useRef<HTMLHeadingElement>(null)

  function animate() {
    const el = textRef.current
    if (!el) return

    const text = "Impresiona a tu cliente"
    const letters = text.split("")

    el.innerHTML = letters
      .map(l => `<span style="display:inline-block">${l === " " ? "&nbsp;" : l}</span>`)
      .join("")

    gsap.from(el.querySelectorAll("span"), {
      y: -80,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: "back.out(1.7)"
    })
  }

  useEffect(() => {
    const timer = setTimeout(animate, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "16px", letterSpacing: "1px", textTransform: "uppercase" }}>
        Letras que caen
      </p>
      <h2
        ref={textRef}
        style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#111",
          minHeight: "2.5rem"
        }}
      />
      <button
        onClick={animate}
        style={{
          marginTop: "20px",
          padding: "8px 20px",
          borderRadius: "8px",
          border: "1px solid #e5e5e5",
          background: "transparent",
          color: "#666",
          cursor: "pointer",
          fontSize: "0.85rem"
        }}
      >
        ▶ Reproducir
      </button>
    </div>
  )
}

export default function TextEffectsPage() {
  return (
    <ExampleLayout
      title="Text Effects"
      description="Typewriter con cursor parpadeante y letras que caen una por una. Los efectos de texto más usados en landings."
      code={code}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        width: "100%"
      }}>
        <TypewriterDemo />
        <div style={{ width: "100%", height: "1px", background: "#f0f0f0" }} />
        <FallingLettersDemo />
      </div>
    </ExampleLayout>
  )
}