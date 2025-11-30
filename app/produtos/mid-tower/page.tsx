import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PcCase, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MidTower() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para Mid Tower."

  const specs = [
    "Placas compatíveis: ATX / Micro ATX",
    "Fonte interna ATX",
    "Gabinete metálico, ventilação otimizada",
    "Processadores: Intel 1ª–14ª geração ou AMD",
    "Memória: DDR3 / DDR4 / DDR5",
    "Armazenamento: SSD / HD / NVMe",
    "SO: Linux (padrão) / Windows (opcional)",
    "Upgrades: slots livres, fácil manutenção",
    "Cores: preto ou branco",
    "Garantia: 1 ano por peça",
    "Certificações: ISO 9001:2015 / PPB / Microsoft Partner",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-8">
                <img
                  src="/placeholder.svg"
                  alt="Mid Tower PC"
                  className="w-full h-auto rounded-xl border border-border"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <PcCase className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">Mid Tower</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8">Equipamento Modular e Robusto</p>
              <p className="text-lg text-muted-foreground mb-8">
                Solução ideal para ambientes corporativos que necessitam de expansibilidade e facilidade de manutenção.
                Gabinete robusto com ventilação otimizada e compatibilidade com placas ATX.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Solicitar Cotação
                </a>
              </Button>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6">Especificações Técnicas</h2>
                <ul className="space-y-3">
                  {specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{spec}</span>
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
