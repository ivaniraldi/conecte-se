"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import { CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const PRODUCT_DATA_DEFAULTS: Record<string, any> = {
  "slim": {
    title: "PC SLIM SFF",
    icon: "Laptop",
    description: "Organização, eficiência e ocupação reduzida",
    content: "Projetado para ambientes que demandam organização, eficiência e ocupação reduzida, o PC SLIM SFF entrega alto desempenho em um gabinete compacto.",
    specs: ["Formato SFF (Small Form Factor)", "Sensor de intrusão de chassi", "Processadores Intel/AMD", "Memória DDR4/DDR5", "Armazenamento SSD NVMe"]
  },
  "mid-tower": {
    title: "Workstation Mid Tower",
    icon: "PcCase",
    description: "Poder, expansibilidade e robustez para sua empresa",
    content: "Computadores de alto desempenho e grande capacidade de expansão para estações de trabalho profissionais que exigem o máximo de hardware.",
    specs: ["Chassi robusto e ventilado", "Alta expansibilidade", "Suporte a múltiplas GPUs", "Fontes reais de alta eficiência"]
  },
  "all-in-one": {
    title: "All in One Corporate",
    icon: "TvMinimalPlay",
    description: "Tecnologia, praticidade e alta performance",
    content: "Otimize sua estação de trabalho com equipamentos que integram monitor e computador em uma única peça elegante e potente.",
    specs: ["Telas IPS Full HD", "Webcam e Microfone integrados", "Design Ultra Slim", "Conectividade Wi-Fi e Bluetooth"]
  },
  "gamer": {
    title: "Gamer & Estação Técnica",
    icon: "Gamepad2",
    description: "Performance extrema para tarefas intensas",
    content: "Desenvolvidos para processamento gráfico pesado, renderização e multitarefas que exigem o máximo de cada componente.",
    specs: ["GPUs de última geração", "Sistemas de refrigeração otimizados", "Componentes Premium", "Gabinete com iluminação controlada"]
  },
  "monitores": {
    title: "Monitores Profissionais",
    icon: "Monitor",
    description: "Qualidade visual e ergonomia para produtividade",
    content: "Linha completa de monitores com tecnologias de proteção ocular e ajustes ergonômicos para longas jornadas de trabalho.",
    specs: ["Resolução Full HD / 4K", "Tecnologia Low Blue Light", "Ajuste de Altura e Pivot", "Múltiplas entradas (HDMI/DP)"]
  },
  "perifericos": {
    title: "Periféricos Corporativos",
    icon: "Keyboard",
    description: "Acessórios de alta durabilidade e precisão",
    content: "Complete sua infraestrutura com teclados, mouses e headsets projetados para o uso intenso no dia a dia corporativo.",
    specs: ["Teclados padrão ABNT2", "Mouses ergonômicos", "Headsets com cancelamento de ruído", "Durabilidade testada"]
  }
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [specs, setSpecs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState<any>(null)
  const [whatsappLink, setWhatsappLink] = useState("")

  const currentSlug = typeof slug === 'string' ? slug : 'slim'
  const defaults = PRODUCT_DATA_DEFAULTS[currentSlug] || PRODUCT_DATA_DEFAULTS['slim']

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/content")
        const data = await response.json()
        
        // Find custom title/description for this product
        const customTitle = data.content.find((c: any) => c.page === 'produtos' && c.key === `${currentSlug}_title`)?.value
        const customDesc = data.content.find((c: any) => c.page === 'produtos' && c.key === `${currentSlug}_description`)?.value
        
        // Fetch specs
        const fetchedSpecs = data.items
          .filter((i: any) => i.page === 'produtos' && i.section === `${currentSlug}_specs`)
          .map((i: any) => i.title)
        
        // Find global whatsapp info
        const globalContent = data.content.filter((c: any) => c.page === 'global')
        const waNumber = globalContent.find((c: any) => c.key === 'whatsapp_number')?.value || "5548913052259"
        const waMessage = globalContent.find((c: any) => c.key === 'whatsapp_message')?.value || `Olá! Gostaria de solicitar uma cotação para ${customTitle || defaults.title}.`
        
        setWhatsappLink(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`)
        
        setPageData({
          title: customTitle || defaults.title,
          description: customDesc || defaults.description,
          icon: defaults.icon,
          content: defaults.content
        })

        if (fetchedSpecs.length > 0) {
          setSpecs(fetchedSpecs)
        } else {
          setSpecs(defaults.specs)
        }
      } catch (error) {
        console.error("Error fetching product data:", error)
        setPageData(defaults)
        setSpecs(defaults.specs)
        setWhatsappLink(`https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para ${defaults.title}.`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentSlug])

  if (loading || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const Icon = (LucideIcons as any)[pageData.icon] || LucideIcons.Package

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-all hover:gap-3">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="mb-8 relative group">
                 <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/placeholder.svg"
                  alt={pageData.title}
                  className="w-full h-auto rounded-xl border border-border relative z-10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight" 
                    dangerouslySetInnerHTML={{ __html: pageData.title }} />
              </div>
              <p className="text-xl text-primary font-medium mb-8"
                 dangerouslySetInnerHTML={{ __html: pageData.description }} />

              <div className="space-y-4 text-muted-foreground mb-8 text-lg leading-relaxed">
                <p>{pageData.content}</p>
              </div>

              <Button asChild size="lg" className="text-lg px-10 h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Solicitar Cotação
                </a>
              </Button>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-8 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                   <div className="w-8 h-1 bg-primary rounded-full" />
                   Especificações Técnicas
                </h2>
                <ul className="space-y-4">
                  {specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3 transition-colors hover:bg-white/5 p-2 rounded-lg -m-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm md:text-base">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
