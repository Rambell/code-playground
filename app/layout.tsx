import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/Sidebar"

export const metadata: Metadata = {
  title: "Code Playground",
  description: "Ejemplos de código interactivos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Sidebar />
        <main style={{ marginLeft: "240px", minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  )
}