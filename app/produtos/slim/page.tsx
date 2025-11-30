import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Laptop, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Slim() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para Slim / SFF."

  const specs = [
    "Formato SFF (Small Form Factor)",
    "Sensor de intrusão de chassi",
    "Placa-mãe: Micro ATX",
    "Fonte externa: 250 W ou 300 W",
    "Cores: preto ou branco",
    "Processadores: Intel 1ª–14ª gen ou AMD",
    "Memória: DDR3 / DDR4 / DDR5",
    "Armazenamento: SSD NVMe / SATA / HD",
    "SO: Linux / Windows sob solicitação",
    "Upgrades: RAM e armazenamento",
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
                  alt="PC SLIM SFF"
                  className="w-full h-auto rounded-xl border border-border"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Laptop className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">PC SLIM SFF</h1>
              </div>
              <p className="text-xl text-primary mb-8">Organização, eficiência e ocupação reduzida</p>

              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  Projetado para ambientes que demandam organização, eficiência e ocupação reduzida, o PC SLIM SFF
                  entrega alto desempenho em um gabinete compacto, ideal para estações de trabalho corporativas, setores
                  administrativos, ambientes educacionais, integrações técnicas e aplicações institucionais.
                </p>
                <p>
                  A estrutura Small Form Factor otimiza o uso do espaço sem comprometer a ventilação ou a capacidade de
                  upgrade. Com sensor de intrusão de chassi, o equipamento oferece uma camada adicional de segurança
                  física, essencial para ambientes com controle de acesso e políticas de TI mais rigorosas.
                </p>
                <p>
                  As configurações são personalizáveis conforme o perfil técnico do projeto: processadores Intel® (1ª à
                  14ª geração), armazenamento SSD NVMe ou SATA, memórias DDR3 ou DDR4 e placas-mãe compatíveis com
                  operação contínua e estabilidade energética.
                </p>
                <p className="font-semibold text-foreground">
                  A linha é produzida sob padrão industrial certificado (ISO 9001:2015 e PPB), garantindo conformidade
                  técnica, padronização e desempenho consistente em grande escala. Ideal para projetos que exigem
                  precisão, previsibilidade e escala.
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
