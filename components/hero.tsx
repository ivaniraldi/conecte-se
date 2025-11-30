import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare } from "lucide-react"

export function Hero() {
  const whatsappLink = "https://wa.me/5548913052259?text=Olá! Gostaria de solicitar um orçamento."

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 animate-gradient" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="absolute inset-0 z-0">
        <img
          src="/modern-technology-circuit-board-with-blue-lights-a.jpg"
          alt="Technology Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      <div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 border border-primary/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-12 h-12 border border-primary/20 rounded-lg animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            Soluções Corporativas em <span className="text-primary">Tecnologia</span> e Hardware
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            Representante oficial especializada em equipamentos de tecnologia para empresas e órgãos públicos.
            Qualidade, suporte técnico e soluções personalizadas para seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Solicitar Cotação
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent group">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Fale com consultor
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
