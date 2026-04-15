"use client"

import Link from "next/link"

const projects = [
  {
    name: "Flowdesk",
    desc: "Landing de SaaS de productividad. Estilo minimalista light con animaciones de scroll, features y pricing.",
    url: "http://localhost:3000",
    tags: ["ScrollTrigger", "Timeline", "Text Reveal", "Stagger"],
    color: "#534AB7"
  },
  {
    name: "Nexus AI",
    desc: "Landing de startup de IA. Dark mode premium con cursor personalizado, text scramble y parallax.",
    url: "http://localhost:3002",
    tags: ["Cursor", "Magnetic", "Scramble", "Typewriter", "Parallax"],
    color: "#1D9E75"
  },
]

export default function ProjectsPage() {
  return (
    <div style={{ padding: "48px" }}>
      <h1 style={{
        fontSize: "1.8rem",
        fontWeight: 700,
        letterSpacing: "-0.5px",
        marginBottom: "8px"
      }}>
        Proyectos
      </h1>
      <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "48px" }}>
        Landings completas construidas con todo lo aprendido.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {projects.map((project) => (
          /* CORRECCIÓN: Se agregó el componente Link que faltaba */
          <Link 
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div style={{
              border: "1px solid #f0f0f0",
              borderRadius: "16px",
              overflow: "hidden",
              background: "white",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = "translateY(-4px)"
              el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = "translateY(0)"
              el.style.boxShadow = "none"
            }}
            >
              {/* Preview color */}
              <div style={{
                height: "160px",
                background: project.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  top: "-40px",
                  right: "-40px"
                }} />
                <span style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-1px",
                  position: "relative",
                  zIndex: 1
                }}>
                  {project.name}
                </span>
                <span style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 10px",
                  borderRadius: "100px"
                }}>
                  Abrir ↗
                </span>
              </div>

              {/* Info */}
              <div style={{ padding: "24px" }}>
                <p style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  lineHeight: 1.6,
                  marginBottom: "16px"
                }}>
                  {project.desc}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      padding: "3px 10px",
                      background: "#f5f5f5",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      color: "#666",
                      fontWeight: 500
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}