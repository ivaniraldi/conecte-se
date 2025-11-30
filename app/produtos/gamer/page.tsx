import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Gamepad2, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Gamer() {
  const whatsappLink =
    "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação para Gamer / Estação Técnica."

  const specs = [
    "Gabinete ATX/Micro ATX com RGB e vidro temperado",
    "CPUs: Intel Core 1ª–14ª gen ou AMD Ryzen/Threadripper",
    "Memória: DDR3 / DDR4 / DDR5 (até 64 GB)",
    "Armazenamento: NVMe / SSD SATA / HD",
    "GPU: NVIDIA (até RTX 4070) ou AMD",
    "Fonte modular 600–850 W 80 Plus",
    "Refrigeração: 3 fans + watercooler opcional",
    "SO: Linux / Windows opcional",
    "Periféricos: placas de captura, som, headset, teclado/mouse gamer",
    "Garantia: 1 ano",
    "Certificações: ISO 9001 / PPB / Microsoft Partner",
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
                  alt="Gamer / Estação Técnica"
                  className="w-full h-auto rounded-xl border border-border"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Gamepad2 className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">Gamer / Estação Técnica</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8">Performance Avançada</p>
              <p className="text-lg text-muted-foreground mb-8">
                Equipamentos de alto desempenho para profissionais que trabalham com edição de vídeo, modelagem 3D, CAD,
                renderização e outras aplicações que demandam máximo poder de processamento gráfico e computacional.
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
