import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Keyboard, CheckCircle2, ArrowLeft, Mouse, Headphones, Webcam, Usb, Fan, Music } from "lucide-react"
import Link from "next/link"

export default function Perifericos() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para Periféricos."

  const categories = [
    {
      icon: Keyboard,
      title: "Teclados",
      features: ["USB / sem fio", "Membrana / mecânico", "Layout ABNT2"],
    },
    {
      icon: Mouse,
      title: "Mouses",
      features: ["Óptico / laser", "Até 8.000 DPI", "Ergonômico"],
    },
    {
      icon: Headphones,
      title: "Headsets",
      features: ["Estéreo / surround", "Noise cancelling", "Microfone destacável"],
    },
    {
      icon: Webcam,
      title: "Webcams",
      features: ["HD / Full HD", "Foco automático", "Microfone integrado"],
    },
    {
      icon: Usb,
      title: "Placas de Captura",
      features: ["HDMI / USB", "4K30 / 1080p60", "Streaming profissional"],
    },
    {
      icon: Fan,
      title: "Coolers & Fans",
      features: ["80 / 120 mm", "PWM", "Baixo ruído"],
    },
    {
      icon: Music,
      title: "Placas de Som",
      features: ["5.1 / 7.1", "USB / PCIe", "Alta fidelidade"],
    },
  ]

  const specs = [
    "Conectividade USB-C e Type-C",
    "Compatibilidade: Linux / Windows",
    "Garantia: 1 ano",
    "Certificações: ISO 9001 / PPB / Microsoft Partner",
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
                alt="Periféricos Corporativos"
                className="w-full h-auto max-h-96 object-cover rounded-xl border border-border"
              />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Keyboard className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Periféricos Corporativos</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Acessórios profissionais para completar sua estação de trabalho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <category.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
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
              <h2 className="text-2xl font-bold mb-6">Diferenciais</h2>
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
