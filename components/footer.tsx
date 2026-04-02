"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const [content, setContent] = useState<any[]>([])

  useEffect(() => {
    async function fetchFooter() {
       try {
         const response = await fetch("/api/admin/content")
         const data = await response.json()
         setContent(data.content.filter((c: any) => c.page === 'footer'))
       } catch (error) {
         console.error("Error fetching footer:", error)
       }
    }
    fetchFooter()
  }, [])

  const getContent = (key: string, defaultValue: string) => {
    return content.find(c => c.key === key)?.value || defaultValue
  }

  const linkedinUrl = getContent('linkedin_url', "https://linkedin.com")
  const instagramUrl = getContent('instagram_url', "https://instagram.com")
  const description = getContent('description', "Representante oficial especializada em soluções corporativas de tecnologia para empresas e órgãos públicos.")
  const phone = getContent('phone', "+55 48 9130-5259")

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <div className="p-2 rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(27,200,191,0.2)]">
                <img
                  src="/logomin.png"
                  alt="Conecte-Se Logo"
                  className="h-8 w-auto"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Conecte-Se</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              {description}
            </p>
            <div className="flex space-x-6">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all hover:bg-primary/5"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all hover:bg-primary/5"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '/' },
                { label: 'Produtos', href: '/produtos' },
                { label: 'Quem Somos', href: '/quem-somos' },
                { label: 'Diferenciais', href: '/diferenciais' },
                { label: 'Contato', href: '/contato' }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-all hover:translate-x-1 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary/50 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contato</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex flex-col gap-1">
                 <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Atendimento</span>
                 <span className="text-lg text-primary font-mono">{phone}</span>
              </li>
              <li className="flex flex-col gap-1">
                 <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Cobertura</span>
                 <span>Logística em todo território nacional</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Conecte-Se Tecnologia Corporativa.</p>
          <div className="flex gap-6">
             <span className="hover:text-primary transition-colors cursor-pointer">Privacidade</span>
             <span className="hover:text-primary transition-colors cursor-pointer">Termos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
