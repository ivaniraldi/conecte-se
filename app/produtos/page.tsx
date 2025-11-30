import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Monitor, PcCase as Pc, Laptop, Gamepad2, MonitorPlay as TvMinimalPlay, Keyboard } from "lucide-react"

export default function Produtos() {
  const products = [
    {
      icon: Pc,
      title: "Mid Tower",
      description: "Equipamento modular e robusto para ambientes corporativos",
      href: "/produtos/mid-tower",
    },
    {
      icon: Laptop,
      title: "Slim / SFF",
      description: "Formato compacto e seguro com sensor de intrusão",
      href: "/produtos/slim",
    },
    {
      icon: TvMinimalPlay,
      title: "All in One",
      description: 'Solução integrada com tela de 19" a 24"',
      href: "/produtos/all-in-one",
    },
    {
      icon: Gamepad2,
      title: "Gamer / Estação Técnica",
      description: "Performance avançada para projetos profissionais",
      href: "/produtos/gamer",
    },
    {
      icon: Monitor,
      title: "Monitores",
      description: "Linha completa de monitores corporativos e gamers",
      href: "/produtos/monitores",
    },
    {
      icon: Keyboard,
      title: "Periféricos",
      description: "Teclados, mouses, headsets e acessórios",
      href: "/produtos/perifericos",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Linha Completa de Produtos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Selecione a categoria de produto para ver especificações técnicas detalhadas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                href={product.href}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <product.icon className="w-14 h-14 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <span className="text-primary font-semibold group-hover:underline">Ver Especificações →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
