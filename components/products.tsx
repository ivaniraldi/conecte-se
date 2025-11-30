import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Monitor, PcCase as Pc, Laptop, Gamepad2, MonitorPlay as TvMinimalPlay, Keyboard, ArrowRight } from "lucide-react"

export function Products() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação."

  const products = [
    { icon: Pc, title: "Mid Tower", href: "/produtos/mid-tower" },
    { icon: Laptop, title: "Slim / SFF", href: "/produtos/slim" },
    { icon: TvMinimalPlay, title: "All in One", href: "/produtos/all-in-one" },
    { icon: Gamepad2, title: "Gamer / Estação Técnica", href: "/produtos/gamer" },
    { icon: Monitor, title: "Monitores", href: "/produtos/monitores" },
    { icon: Keyboard, title: "Periféricos", href: "/produtos/perifericos" },
  ]

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Linha completa de equipamentos para sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-4">
                <product.icon className="w-12 h-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <span className="text-sm text-primary group-hover:underline">Ver detalhes →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 group">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Solicitar Cotação
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
