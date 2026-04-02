import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QuickHighlights } from "@/components/quick-highlights"
import { Products } from "@/components/products"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { getSiteContent, getSectionItems, getWhatsAppLink } from "@/lib/get-content"

export default async function Home() {
  const content = await getSiteContent('home');
  const highlights = await getSectionItems('home', 'highlights');
  const products = await getSectionItems('home', 'products');
  const whatsappLink = await getWhatsAppLink();

  // Merge whatsappLink into content for easy access by components
  const enrichedContent = { ...content, whatsapp_link: whatsappLink };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero content={enrichedContent} />
      <QuickHighlights items={highlights} content={enrichedContent} />
      <Products items={products} content={enrichedContent} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
