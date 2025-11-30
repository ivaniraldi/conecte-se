import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conecte-Se | Soluções em Tecnologia B2B",
  description:
    "Representante oficial especializada em soluções corporativas de tecnologia, hardware industrial e automação comercial para empresas e órgãos públicos.",
  icons: {
    icon: "/logomin.png",
    shortcut: "/logomin.png",
    apple: "/logomin.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logomin.png" type="image/png" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
