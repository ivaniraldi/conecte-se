import * as LucideIcons from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface QuickHighlightItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  href?: string;
}

interface QuickHighlightsProps {
  items: QuickHighlightItem[];
  content: Record<string, string>;
}

export function QuickHighlights({ items, content }: QuickHighlightsProps) {
  const displayItems = items.length > 0 ? items : [
    {
      id: 1,
      title: "Representante Oficial",
      description: "Parceiro autorizado das melhores marcas",
      icon_name: "Award",
    },
    {
      id: 2,
      title: "Atendimento Consultivo",
      description: "Suporte técnico especializado",
      icon_name: "Wrench",
    },
    {
      id: 3,
      title: "Qualidade Garantida",
      description: "Produtos certificados e testados",
      icon_name: "Shield",
    },
    {
      id: 4,
      title: "Especialistas em Licitações",
      description: "Experiência no setor público",
      icon_name: "FileText",
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: content.highlights_title || "Por que escolher a Conecte-Se" }} />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.highlights_description || "Representante especializada com foco em soluções corporativas e atendimento personalizado"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((highlight, index) => {
            const Icon = (LucideIcons as any)[highlight.icon_name] || LucideIcons.HelpCircle;
            const isLink = highlight.href && highlight.href !== "#";
            const CardWrapper = isLink ? Link : "div";

            return (
              <CardWrapper
                key={highlight.id}
                {...(isLink ? { href: highlight.href } : {} as any)}
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-4",
                  isLink && "hover:scale-[1.02] cursor-pointer"
                )}
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  {isLink && (
                    <span className="text-[10px] text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Saiba mais <LucideIcons.ArrowRight size={10} />
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  )
}
