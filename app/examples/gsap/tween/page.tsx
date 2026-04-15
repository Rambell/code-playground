"use client"

import ExampleLayout from "@/components/ExampleLayout"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const code = `const boxRef = useRef(null)

// from → anima DESDE estos valores hasta el estado actual
gsap.from(boxRef.current, {
  opacity: 0,
  x: -100,
  duration: 0.8,
  ease: "power2.out"
})

// to → anima HACIA estos valores desde el estado actual  
gsap.to(boxRef.current, {
  rotation: 360,
  scale: 1.2,
  duration: 0.6,
  ease: "back.out(1.7)"
})

// fromTo → control total de inicio y fin
gsap.fromTo(boxRef.current,
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8 }
)`

function Demo() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [type, setType] = useState<"from" | "to" | "fromTo">("from")

  function play(t: "from" | "to" | "fromTo") {
    setType(t)
    gsap.killTweensOf(boxRef.current)

    if (t === "from") {
      gsap.set(boxRef.current, { opacity: 1, x: 0, rotation: 0, scale: 1 })
      gsap.from(boxRef.current, { opacity: 0, x: -100, duration: 0.8, ease: "power2.out" })
    }
    if (t === "to") {
      gsap.set(boxRef.current, { rotation: 0, scale: 1 })
      gsap.to(boxRef.current, { rotation: 360, scale: 1.2, duration: 0.8, ease: "back.out(1.7)", yoyo: true, repeat: 1 })
    }
    if (t === "fromTo") {
      gsap.fromTo(boxRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
    }
  }

  useEffect(() => { play("from") }, [])

  const btnStyle = (t: string) => ({
    padding: "8px 20px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
    background: type === t ? "#111" : "transparent",
    color: type === t ? "white" : "#666",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500 as const
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
      <div ref={boxRef} style={{
        width: "70px",
        height: "70px",
        borderRadius: "14px",
        background: "#534AB7"
      }} />
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={btnStyle("from")} onClick={() => play("from")}>gsap.from()</button>
        <button style={btnStyle("to")} onClick={() => play("to")}>gsap.to()</button>
        <button style={btnStyle("fromTo")} onClick={() => play("fromTo")}>gsap.fromTo()</button>
      </div>
    </div>
  )
}

export default function TweenPage() {
  return (
    <ExampleLayout
      title="GSAP Tween"
      description="Los tres métodos principales de GSAP. from, to y fromTo son la base de todas las animaciones."
      code={code}
    >
      <Demo />
    </ExampleLayout>
  )
}