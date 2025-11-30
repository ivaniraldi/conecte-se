import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MonitorPlay as TvMinimalPlay, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AllInOne() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para All in One."

  const specs = [
    'Tela: 19", 21.5", 24"',
    "Placa-mãe AIO barebone",
    "Processadores: Intel 1ª–14ª gen ou AMD",
    "Memória: DDR3 / DDR4 / DDR5 (até 32 GB)",
    "Armazenamento: SSD / NVMe / SATA",
    "Fonte interna, baixo consumo",
    "Teclado e mouse USB (+ opcional sem fio)",
    "SO: Linux / Windows 7, 10, 11 (opcional)",
    "Cores: preto ou branco",
    "Bordas ultrafinas",
    "Garantia: 1 ano",
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
                  alt="All in One PC"
                  className="w-full h-auto rounded-xl border border-border"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <TvMinimalPlay className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">All in One</h1>
              </div>
              <p className="text-xl text-primary mb-8">Tecnologia, praticidade e performance em um só equipamento</p>

              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  Nossos All in One são a escolha ideal para quem busca padronização, economia de espaço e visual clean
                  — com robustez e performance para revendas, licitações, projetos educacionais e estruturas
                  corporativas.
                </p>
                <p>
                  Com processadores Intel® (1ª à 14ª geração), SSD NVMe ou SATA, memória DDR3/DDR4 e telas com bordas
                  ultrafinas, os AIOs combinam alto desempenho e ergonomia em um design compacto e elegante. Ideais para
                  ambientes onde organização, estética e eficiência térmica são prioridade.
                </p>
                <p>
                  Produzidos com padrão industrial certificado (ISO 9001:2015 e PPB), rastreabilidade completa e suporte
                  Microsoft Partner, garantimos entrega técnica precisa, confiável e alinhada às exigências
                  institucionais. Nosso suporte consultivo acompanha da pré-venda ao pós-instalação.
                </p>
                <p className="font-semibold text-foreground">
                  Soluções sob demanda, lead time otimizado e máximo ROI para quem não abre mão de agilidade, compliance
                  e escala.
                </p>
              </div>

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
