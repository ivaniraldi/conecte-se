import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QuickHighlights } from "@/components/quick-highlights"
import { Products } from "@/components/products"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <QuickHighlights />
      <Products />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
