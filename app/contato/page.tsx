import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function Contato() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Solicite uma cotação personalizada para sua empresa ou órgão público
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
