import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Cpu, HardDrive, MemoryStick as Memory, Settings, Shield, Zap, Award, FileText } from "lucide-react"

export default function Diferenciais() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de saber mais sobre os diferenciais."

  const features = [
    {
      icon: Cpu,
      title: "Processadores Personalizados",
      description: "Configurações com Intel 1ª à 14ª geração e AMD sob medida",
    },
    {
      icon: Memory,
      title: "Memória Flexível",
      description: "DDR3, DDR4 ou DDR5 de acordo com sua necessidade",
    },
    {
      icon: HardDrive,
      title: "Armazenamento Híbrido",
      description: "SSD, HD ou configurações híbridas para performance ideal",
    },
    {
      icon: Settings,
      title: "Compatibilidade Linux",
      description: "Linux padrão ou Windows opcional",
    },
    {
      icon: Shield,
      title: "Sensor de Intrusão",
      description: "Opções com segurança física integrada (Slim/SFF)",
    },
    {
      icon: Zap,
      title: "Fonte Otimizada",
      description: "Fontes silenciosas ou externas para diferentes formatos",
    },
    {
      icon: Award,
      title: "Design Técnico",
      description: "Projetos funcionais em Mid Tower, Gamer e All-in-One",
    },
    {
      icon: FileText,
      title: "Licitações e Locações",
      description: "Suporte completo para contratos públicos e corporativos",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Por que escolher a Conecte-Se
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Representante oficial com expertise em soluções corporativas, oferecendo produtos de qualidade com suporte técnico especializado e atendimento consultivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="text-lg px-8">
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
