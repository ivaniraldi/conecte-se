import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { getSiteContent } from "@/lib/get-content"

export default async function Contato() {
  const content = await getSiteContent('contato');

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {content.title || "Entre em Contato"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              {content.description || "Solicite uma cotação personalizada para sua empresa ou órgão público"}
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
