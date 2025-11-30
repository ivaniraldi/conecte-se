import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Monitor, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Monitores() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para Monitores."

  const types = [
    {
      title: "Office",
      features: ["Uso administrativo", "Resolução nítida", "Baixo consumo", "Ideal para escritórios"],
    },
    {
      title: "Gamer",
      features: ["Alto desempenho", "Taxas de atualização elevadas", "Cores vibrantes", "Experiência imersiva"],
    },
    {
      title: "Ergonômico",
      features: ["Ajuste de altura", "Inclinação e rotação", "Suporte VESA", "Redução de fadiga"],
    },
    {
      title: "Curvo",
      features: ["Imersão visual", "Uso intensivo", "Múltiplos displays", "Experiência premium"],
    },
  ]

  const specs = [
    'Tamanhos: 15" a 32"',
    "Resolução nítida (Full HD a 4K)",
    "Painéis LED de baixo consumo",
    "Conectividade: HDMI, VGA, DisplayPort",
    "Bordas ultrafinas",
    "Suporte para múltiplos displays",
    "Certificações: ISO 9001:2015 / PPB",
    "Garantia: 1 ano",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Link>

          <div className="mb-12">
            <div className="mb-8">
              <img
                src="/placeholder.svg"
                alt="Monitores Corporativos"
                className="w-full h-auto max-h-96 object-cover rounded-xl border border-border"
              />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Monitor className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Monitores</h1>
            </div>
            <div className="space-y-4 text-muted-foreground max-w-4xl">
              <p className="text-xl">
                Nossa linha de monitores foi desenvolvida para atender com precisão as diferentes demandas do mercado
                corporativo, institucional e técnico.
              </p>
              <p>
                Oferecemos modelos para aplicações administrativas, operacionais e de alta exigência visual — ideais
                para revendas, editais públicos, redes de ensino, escritórios, assistências técnicas e ambientes gamer.
              </p>
              <p>
                Disponíveis em tamanhos de 15" a 32", contamos com monitores nas seguintes categorias: Office, Gamer,
                Ergonômicos e Curvos.
              </p>
              <p>
                Os equipamentos oferecem resolução nítida, painéis LED de baixo consumo, conectividade padrão (HDMI,
                VGA, Display Port) e bordas ultrafinas para melhor aproveitamento em ambientes organizados ou
                multitelas.
              </p>
              <p className="font-semibold text-foreground">
                Produzidos com conformidade técnica e certificados ISO 9001:2015 e PPB, nossos monitores são preparados
                para atender projetos com exigência de padronização, ergonomia e escala. Contamos com suporte técnico
                consultivo para indicar o modelo ideal de acordo com o perfil de uso.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {types.map((type, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-4">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-8 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6">Especificações Gerais</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
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
