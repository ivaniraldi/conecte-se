import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { ArrowRight } from "lucide-react"

interface ProductItem {
  id: number;
  title: string;
  description?: string;
  href: string;
  icon_name: string;
}

interface ProductsProps {
  items: ProductItem[];
  content: Record<string, string>;
}

export function Products({ items, content }: ProductsProps) {
  const whatsappLink = content.whatsapp_link || "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar uma cotação."

  const displayProducts = items.length > 0 ? items : [
    { id: 1, icon_name: "PcCase", title: "Mid Tower", href: "/produtos/mid-tower" },
    { id: 2, icon_name: "Laptop", title: "Slim / SFF", href: "/produtos/slim" },
    { id: 3, icon_name: "TvMinimalPlay", title: "All in One", href: "/produtos/all-in-one" },
    { id: 4, icon_name: "Gamepad2", title: "Gamer / Estação Técnica", href: "/produtos/gamer" },
    { id: 5, icon_name: "Monitor", title: "Monitores", href: "/produtos/monitores" },
    { id: 6, icon_name: "Keyboard", title: "Periféricos", href: "/produtos/perifericos" },
  ]

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: content.products_title || "Produtos" }} />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.products_description || "Linha completa de equipamentos para sua empresa"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayProducts.map((product) => {
            // Map common icons that might be named differently in the source
            let iconName = product.icon_name;
            if (iconName === 'Pc') iconName = 'PcCase';
            
            const Icon = (LucideIcons as any)[iconName] || LucideIcons.Package;
            
            return (
              <Link
                key={product.id}
                href={product.href}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4">
                  <Icon className="w-12 h-12 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">{product.title}</h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <span className="text-xs text-primary group-hover:underline mt-2 inline-block">Ver detalhes →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 group">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {content.button1_text || "Solicitar Cotação"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
