"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Diferenciais() {
  const [content, setContent] = useState<any[]>([])
  const [globalContent, setGlobalContent] = useState<any[]>([])
  const [features, setFeatures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/content")
        const data = await response.json()
        
        setContent(data.content.filter((c: any) => c.page === 'diferenciais'))
        setGlobalContent(data.content.filter((c: any) => c.page === 'global'))
        const fetchedFeatures = data.items.filter((i: any) => i.page === 'diferenciais' && i.section === 'features')
        
        if (fetchedFeatures.length > 0) {
          setFeatures(fetchedFeatures)
        } else {
          // Fallback to default if empty
          setFeatures([
            { icon_name: "Cpu", title: "Processadores Personalizados", description: "Configurações com Intel 1ª à 14ª geração e AMD sob medida" },
            { icon_name: "MemoryStick", title: "Memória Flexível", description: "DDR3, DDR4 ou DDR5 de acordo com sua necessidade" },
            { icon_name: "HardDrive", title: "Armazenamento Híbrido", description: "SSD, HD ou configurações híbridas para performance ideal" },
            { icon_name: "Settings", title: "Compatibilidade Linux", description: "Linux padrão ou Windows opcional" },
          ])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getContent = (key: string, defaultValueRef: string) => {
    return content.find(c => c.key === key)?.value || defaultValueRef
  }

  const whatsappLink = (() => {
    const number = globalContent.find(c => c.key === 'whatsapp_number')?.value || "5548913052259"
    const message = globalContent.find(c => c.key === 'whatsapp_message')?.value || "Olá! Gostaria de saber mais sobre os diferenciais."
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  })()

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
     )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance"
                dangerouslySetInnerHTML={{ __html: getContent('title', 'Por que escolher a Conecte-Se') }} />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              {getContent('description', 'Representante oficial com expertise em soluções corporativas, oferecendo produtos de qualidade com suporte técnico especializado e atendimento consultivo')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = (LucideIcons as any)[feature.icon_name] || LucideIcons.HelpCircle
              const isLink = feature.href && feature.href !== "#";
              const CardWrapper = isLink ? Link : "div";

              return (
                <CardWrapper
                  key={index}
                  {...(isLink ? { href: feature.href } : {} as any)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-4",
                    isLink && "hover:scale-[1.02] cursor-pointer"
                  )}
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    {isLink && (
                      <span className="text-[10px] text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Saiba mais <LucideIcons.ArrowRight size={10} />
                      </span>
                    )}
                  </div>
                </CardWrapper>
              )
            })}
          </div>

          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Solicitar Cotação
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
