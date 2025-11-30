import { Award, Shield, FileText, Wrench } from "lucide-react"

export function QuickHighlights() {
  const highlights = [
    {
      icon: Award,
      title: "Representante Oficial",
      description: "Parceiro autorizado das melhores marcas",
    },
    {
      icon: Wrench,
      title: "Atendimento Consultivo",
      description: "Suporte técnico especializado",
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Produtos certificados e testados",
    },
    {
      icon: FileText,
      title: "Especialistas em Licitações",
      description: "Experiência no setor público",
    },
  ]

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Conecte-Se</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Representante especializada com foco em soluções corporativas e atendimento personalizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <highlight.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
