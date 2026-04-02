"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  LayoutDashboard, 
  Settings2, 
  LogOut, 
  Plus, 
  Save, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  Star, 
  Box, 
  MessageSquare, 
  Info, 
  ChevronRight, 
  ExternalLink, 
  Monitor,
  Highlighter
} from "lucide-react"
import { IconSelector } from "@/components/admin/icon-selector"
import { cn } from "@/lib/utils"

type SiteContent = {
  id: number
  page: string
  section: string
  key: string
  value: string
  type: string
}

type SiteSectionItem = {
  id?: number
  page: string
  section: string
  title: string
  description: string
  image_url: string
  icon_name: string
  href: string
  order_index: number
}

const PRODUCT_CATEGORIES = [
  { id: 'mid-tower', name: 'Mid Tower' },
  { id: 'slim', name: 'Slim / SFF' },
  { id: 'all-in-one', name: 'All in One' },
  { id: 'gamer', name: 'Gamer' },
  { id: 'monitores', name: 'Monitores' },
  { id: 'perifericos', name: 'Periféricos' },
]

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent[]>([])
  const [items, setItems] = useState<SiteSectionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<number | string | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/content")
      const data = await response.json()
      setContent(data.content || [])
      setItems(data.items || [])
    } catch (error) {
      toast.error("Erro ao carregar dados")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateContent = async (id: number, newValue: string) => {
    const item = content.find((c) => c.id === id)
    if (!item) return

    setSaving(id)
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "site_content",
          data: { ...item, value: newValue },
        }),
      })

      if (response.ok) {
        setContent(content.map((c) => (c.id === id ? { ...c, value: newValue } : c)))
        toast.success("Conteúdo atualizado")
      } else {
        toast.error("Erro ao atualizar")
      }
    } catch (error) {
      toast.error("Erro na requisição")
    } finally {
      setSaving(null)
    }
  }

  const handleUpdateItem = async (item: SiteSectionItem) => {
    setSaving(item.id || "new")
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "site_section_item", data: item }),
      })

      if (response.ok) {
        toast.success("Item atualizado")
        fetchData()
      } else {
        toast.error("Erro ao atualizar item")
      }
    } catch (error) {
      toast.error("Erro na requisição")
    } finally {
      setSaving(null)
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return

    setSaving(id)
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "delete_section_item", data: { id } }),
      })

      if (response.ok) {
        toast.success("Item excluído")
        setItems(items.filter((item) => item.id !== id))
      } else {
        toast.error("Erro ao excluir")
      }
    } catch (error) {
      toast.error("Erro na requisição")
    } finally {
      setSaving(null)
    }
  }

  const handleSeedSpecs = async (catId: string) => {
    const defaults: Record<string, any> = {
      'slim': {
        specs: ["Formato SFF (Small Form Factor)", "Sensor de intrusão de chassi", "Processadores Intel/AMD", "Memória DDR4/DDR5", "Armazenamento SSD NVMe"],
        title: "PC SLIM SFF",
        desc: "Organização, eficiência e ocupação reduzida"
      },
      'mid-tower': {
        specs: ["Chassi robusto e ventilado", "Alta expansibilidade", "Suporte a múltiplas GPUs", "Fontes reais de alta eficiência"],
        title: "Workstation Mid Tower",
        desc: "Poder, expansibilidade e robustez para sua empresa"
      },
      'all-in-one': {
        specs: ["Telas IPS Full HD", "Webcam e Microfone integrados", "Design Ultra Slim", "Conectividade Wi-Fi e Bluetooth"],
        title: "All in One Corporate",
        desc: "Tecnologia, praticidade e alta performance"
      },
      'gamer': {
        specs: ["GPUs de última geração", "Sistemas de refrigeração otimizados", "Componentes Premium", "Gabinete com iluminação controlada"],
        title: "Gamer & Estação Técnica",
        desc: "Performance extrema para tarefas intensas"
      },
      'monitores': {
        specs: ["Resolução Full HD / 4K", "Tecnologia Low Blue Light", "Ajuste de Altura e Pivot", "Múltiplas entradas (HDMI/DP)"],
        title: "Monitores Profissionais",
        desc: "Qualidade visual e ergonomia para produtividade"
      },
      'perifericos': {
        specs: ["Teclados padrão ABNT2", "Mouses ergonômicos", "Headsets com cancelamento de ruído", "Durabilidade testada"],
        title: "Periféricos Corporativos",
        desc: "Acessórios de alta durabilidade e precisão"
      }
    }

    const config = defaults[catId]
    if (!config) return

    setSaving(`seed-${catId}`)
    try {
      // Seed Page Content
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "site_content", 
          data: { page: 'produtos', section: 'detail', key: `${catId}_title`, value: config.title } 
        }),
      })
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "site_content", 
          data: { page: 'produtos', section: 'detail', key: `${catId}_description`, value: config.desc } 
        }),
      })

      // Seed Specs
      const specs = config.specs
      for (let i = 0; i < specs.length; i++) {
        await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            type: "site_section_item", 
            data: { 
              page: 'produtos', 
              section: `${catId}_specs`, 
              title: specs[i], 
              description: '', 
              image_url: '', 
              icon_name: 'CheckCircle2', 
              href: '#', 
              order_index: i 
            } 
          }),
        })
      }
      toast.success("Especificações padrão carregadas")
      fetchData()
    } catch (error) {
      toast.error("Erro ao carregar padrões")
    } finally {
      setSaving(null)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin")
  }

  const handleSeedFooter = async () => {
    const defaults = [
      { page: 'footer', section: 'info', key: 'phone', value: '+55 48 9130-5259' },
      { page: 'footer', section: 'info', key: 'description', value: 'Representante oficial especializada em soluções corporativas de tecnologia para empresas e órgãos públicos.' },
      { page: 'footer', section: 'social', key: 'linkedin_url', value: 'https://linkedin.com' },
      { page: 'footer', section: 'social', key: 'instagram_url', value: 'https://instagram.com' },
      { page: 'global', section: 'whatsapp', key: 'whatsapp_number', value: '5548913052259' },
      { page: 'global', section: 'whatsapp', key: 'whatsapp_message', value: 'Olá! Gostaria de mais informações sobre as soluções da Conecte-Se.' },
    ]

    setSaving('seed-footer')
    try {
      for (const item of defaults) {
        await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "site_content", data: item }),
        })
      }
      toast.success("Informações de rodapé carregadas")
      fetchData()
    } catch (error) {
      toast.error("Erro ao carregar rodapé")
    } finally {
      setSaving(null)
    }
  }

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const formData = new FormData()
    formData.append("image", file)
    
    setSaving("upload")
    try {
      const apiKey = "33ce52a04ce83f73197af9f3a42c7cea"
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        callback(data.data.url)
        toast.success("Imagem enviada com sucesso")
      } else {
        toast.error("Erro no upload da imagem")
      }
    } catch (err) {
      toast.error("Erro ao enviar imagem")
    } finally {
      setSaving(null)
    }
  }

  const handleHighlight = (itemId: string | number, isTable: boolean = false) => {
    const input = document.getElementById(`input-${itemId}`) as HTMLInputElement | HTMLTextAreaElement
    if (!input) return

    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0
    const text = input.value
    const selectedText = text.substring(start, end)
    
    if (selectedText) {
      const newText = text.substring(0, start) + `<span class="text-primary">${selectedText}</span>` + text.substring(end)
      if (isTable) {
        setItems(items.map(i => i.id === itemId ? { ...i, title: newText } : i))
      } else {
        setContent(content.map(c => c.id === itemId ? { ...c, value: newText } : c))
      }
    } else {
      toast.info("Selecione um texto para destacar")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
        </div>
        <p className="mt-4 text-gray-400 font-medium animate-pulse">Carregando painel...</p>
      </div>
    )
  }

  const renderContentField = (item: SiteContent) => (
    <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:bg-white/[0.07] hover:border-white/20">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
          {item.key.replace(/_/g, " ")}
          {item.type === "image" && <ImageIcon className="h-3 w-3 text-muted-foreground" />}
        </Label>
        {saving === item.id && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
      </div>
      
      {item.type === "image" ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input 
              value={item.value || ""} 
              onChange={(e) => setContent(content.map(c => c.id === item.id ? {...c, value: e.target.value} : c))}
              placeholder="URL da imagem"
              className="bg-black/50 border-white/10 focus:ring-primary/20 transition-all text-sm"
            />
            <input
              type="file"
              id={`file-${item.id}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file, (url) => handleUpdateContent(item.id, url))
              }}
            />
            <Button variant="outline" size="icon" onClick={() => document.getElementById(`file-${item.id}`)?.click()} className="shrink-0 border-white/10 hover:bg-primary/20 hover:text-primary">
              <Plus className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleUpdateContent(item.id, item.value)} disabled={saving !== null} size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Save className="h-4 w-4" />
            </Button>
          </div>
          {item.value && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-black/50">
              <img src={item.value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      ) : item.key === 'whatsapp_link' ? (
        <div className="flex flex-col gap-2">
           <div className="flex gap-2">
            <Textarea 
              value={(() => {
                try {
                  const url = new URL(item.value || "");
                  return url.searchParams.get('text') || "";
                } catch (e) {
                  return item.value || "";
                }
              })()}
              onChange={(e) => {
                const message = e.target.value;
                const fullUrl = `https://wa.me/5548913052259?text=${encodeURIComponent(message)}`;
                setContent(content.map(c => c.id === item.id ? {...c, value: fullUrl} : c));
              }}
              placeholder="Digite a mensagem padrão do WhatsApp..."
              rows={2}
              className="bg-black/50 border-white/10 focus:ring-primary/20 transition-all text-sm resize-none"
            />
            <Button onClick={() => handleUpdateContent(item.id, item.value)} disabled={saving !== null} size="sm" className="h-auto px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Save className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-gray-500 italic">
            O link será gerado automaticamente com o número da empresa.
          </p>
        </div>
      ) : item.type === 'link' || item.key.includes("description") || item.value.length > 50 ? (
        <div className="flex gap-2">
          <Textarea 
            value={item.value || ""} 
            onChange={(e) => setContent(content.map(c => c.id === item.id ? {...c, value: e.target.value} : c))}
            rows={3}
            className="bg-black/50 border-white/10 focus:ring-primary/20 transition-all text-sm resize-none"
          />
          <Button onClick={() => handleUpdateContent(item.id, item.value)} disabled={saving !== null} size="sm" className="h-auto px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            <Save className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input 
                id={`input-${item.id}`}
                value={item.value || ""} 
                onChange={(e) => setContent(content.map(c => c.id === item.id ? {...c, value: e.target.value} : c))} 
                className="bg-black/50 border-white/10 focus:ring-primary/20 transition-all text-sm pr-10"
              />
              {item.key.includes("title") && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1 h-7 w-7 text-gray-500 hover:text-primary"
                  onClick={() => handleHighlight(item.id!)}
                  title="Destacar texto selecionado"
                >
                  <Highlighter className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            <Button onClick={() => handleUpdateContent(item.id, item.value)} disabled={saving !== null} size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Save className="h-4 w-4" />
            </Button>
          </div>
          {item.key.includes("title") && (
            <p className="text-[10px] text-gray-500 italic">
              Selecione uma palavra e clique no ícone de marca-texto para destacar.
            </p>
          )}
        </div>
      )}
    </div>
  )

  const renderSectionItem = (item: SiteSectionItem, allowIcon = true, allowOrder = true) => (
    <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-xl p-5 transition-all hover:bg-white/[0.07] hover:border-white/20">
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
          onClick={() => item.id && handleDeleteItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-400">Título</Label>
            <div className="relative">
              <Input 
                id={`input-${item.id}`}
                value={item.title || ""} 
                onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, title: e.target.value} : i))}
                className="bg-black/40 border-white/5 text-sm pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1 h-7 w-7 text-gray-500 hover:text-primary"
                onClick={() => handleHighlight(item.id!, true)}
                title="Destacar texto selecionado"
              >
                <Highlighter className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          {allowIcon ? (
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">Atribuir Ícone</Label>
              <IconSelector 
                value={item.icon_name} 
                onChange={(icon) => setItems(items.map(i => i.id === item.id ? {...i, icon_name: icon} : i))} 
              />
            </div>
          ) : (
             <div className="space-y-1.5">
              <Label className="text-xs text-gray-400">URL da Imagem</Label>
              <Input 
                value={item.image_url || ""} 
                onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, image_url: e.target.value} : i))}
                className="bg-black/40 border-white/5 text-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-400">Descrição / Conteúdo</Label>
          <Textarea 
            value={item.description || ""} 
            onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, description: e.target.value} : i))}
            rows={2}
            className="bg-black/40 border-white/5 text-sm resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1.5">
            <Label className="text-xs text-gray-400">Link de Ação (URL)</Label>
            <Input 
              value={item.href || ""} 
              onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, href: e.target.value} : i))}
              className="bg-black/40 border-white/5 text-sm"
            />
          </div>
          {allowOrder && (
            <div className="w-20 space-y-1.5">
              <Label className="text-xs text-gray-400 text-center block">Ordem</Label>
              <Input 
                type="number" 
                value={item.order_index ?? 0} 
                onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, order_index: parseInt(e.target.value)} : i))}
                className="bg-black/40 border-white/5 text-sm text-center"
              />
            </div>
          )}
        </div>

        <Button 
          onClick={() => handleUpdateItem(item)} 
          disabled={saving !== null}
          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
        >
          {saving === item.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CMS Conecte-Se</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-0.5">Sistema de Gestão Interna</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex hover:bg-white/5 text-gray-400">
              <a href="/" target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Abrir Site Principal</a>
            </Button>
            <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block" />
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-destructive/20 text-destructive hover:bg-destructive/10 bg-transparent">
              <LogOut className="mr-2 h-4 w-4" /> Sair do Painel
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
             <div className="bg-white/5 border border-white/5 rounded-2xl p-2 sticky top-28">
                <nav className="flex flex-col gap-1">
                  {[
                    { id: "home", label: "Página Inicial", icon: LayoutDashboard },
                    { id: "quem-somos", label: "Quem Somos", icon: Info },
                    { id: "diferenciais", label: "Diferenciais", icon: Star },
                    { id: "produtos", label: "Produtos", icon: Box },
                    { id: "contato", label: "Contato", icon: MessageSquare },
                    { id: "footer", label: "Rodapé", icon: Settings2 },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                        activeTab === item.id 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {activeTab === item.id && <ChevronRight className="ml-auto h-3 w-3" />}
                    </button>
                  ))}
                </nav>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <Tabs value={activeTab} className="w-full">
              {/* Home Content */}
              <TabsContent value="home" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <Card className="bg-white/5 border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                      <CardTitle className="text-lg">Hero Section</CardTitle>
                      <CardDescription>Capa da página inicial e call-to-actions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {content.filter(c => c.page === 'home' && c.section === 'hero').map(renderContentField)}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Destaques (Highlights)</CardTitle>
                        <CardDescription>Boxes informativos sob o hero</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        {items.filter(i => i.page === 'home' && i.section === 'highlights').map((item) => renderSectionItem(item))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/5 border-white/5 overflow-hidden">
                   <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between py-4">
                    <div>
                      <CardTitle className="text-lg">Barra de Produtos (Grid)</CardTitle>
                      <CardDescription>Categorias de produtos exibidas na Home</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10" onClick={() => {
                      const newItem: SiteSectionItem = { page: 'home', section: 'products', title: 'Novo Produto', description: '', image_url: '', icon_name: 'Box', href: '#', order_index: items.length };
                      setItems([...items, newItem]);
                    }}>
                      <Plus className="mr-2 h-4 w-4" /> Novo Produto
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.filter(i => i.page === 'home' && i.section === 'products').map((item) => renderSectionItem(item))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quem Somos Content */}
              <TabsContent value="quem-somos" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="bg-white/5 border-white/5 max-w-4xl mx-auto">
                  <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                    <CardTitle className="text-lg">Conteúdo da Empresa</CardTitle>
                    <CardDescription>História, missão e imagem institucional</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {content.filter(c => c.page === 'quem-somos').map(renderContentField)}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Diferenciais Content */}
              <TabsContent value="diferenciais" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold">Diferenciais Competitivos</h2>
                      <p className="text-gray-400">Gerencie os benefícios exibidos na página de Diferenciais</p>
                    </div>
                    <Button onClick={() => {
                       const newItem: SiteSectionItem = { page: 'diferenciais', section: 'features', title: 'Novo Diferencial', description: '', image_url: '', icon_name: 'Star', href: '#', order_index: items.length };
                       setItems([...items, newItem]);
                    }} className="bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Diferencial
                    </Button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.filter(i => i.page === 'diferenciais' && i.section === 'features').map((item) => renderSectionItem(item))}
                 </div>

                 <Card className="bg-white/5 border-white/5 mt-8">
                    <CardHeader>
                      <CardTitle className="text-lg">Textos da Página</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {content.filter(c => c.page === 'diferenciais').map(renderContentField)}
                    </CardContent>
                 </Card>
              </TabsContent>

              {/* Produtos Content */}
              <TabsContent value="produtos" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Card key={cat.id} className="bg-white/5 border-white/5 overflow-hidden">
                        <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{cat.name}</CardTitle>
                            <CardDescription>Gerenciar especificações técnicas</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="bg-white/5 border-white/10" onClick={() => {
                            const newItem: SiteSectionItem = { page: 'produtos', section: `${cat.id}_specs`, title: 'Nova Especificação', description: '', image_url: '', icon_name: 'CheckCircle2', href: '#', order_index: items.length };
                            setItems([...items, newItem]);
                          }}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                         <CardContent className="p-6 space-y-6">
                            {/* Page Content Editors */}
                            <div className="space-y-4 pb-4 border-b border-white/5">
                               {content.filter(c => c.page === 'produtos' && c.key === `${cat.id}_title`).map(renderContentField)}
                               {content.filter(c => c.page === 'produtos' && c.key === `${cat.id}_description`).map(renderContentField)}
                               {content.filter(c => c.page === 'produtos' && (c.key === `${cat.id}_title` || c.key === `${cat.id}_description`)).length === 0 && (
                                 <p className="text-[10px] text-gray-500 italic">Configure o título e descrição da página usando o botão de padrões abaixo.</p>
                               )}
                            </div>

                            {/* Specs Editor */}
                            <div className="space-y-4">
                               <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Especificações de Hardware</Label>
                               {items.filter(i => i.page === 'produtos' && i.section === `${cat.id}_specs`).length === 0 ? (
                               <div className="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-xl space-y-3">
                                  <p className="text-xs text-gray-500 text-center">Nenhuma especificação encontrada.</p>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-[10px] h-7 border-primary/20 hover:bg-primary/10 text-primary"
                                    onClick={() => handleSeedSpecs(cat.id)}
                                    disabled={saving === `seed-${cat.id}`}
                                  >
                                    {saving === `seed-${cat.id}` ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
                                    Carregar padrões
                                  </Button>
                               </div>
                            ) : (
                              items.filter(i => i.page === 'produtos' && i.section === `${cat.id}_specs`).map((item) => (
                                <div key={item.id} className="flex gap-2 items-start bg-black/20 p-2 rounded-lg group">
                                  <Input 
                                    value={item.title || ""} 
                                    onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, title: e.target.value} : i))}
                                    className="bg-transparent border-none text-sm h-8"
                                    placeholder="Ex: Memória DDR4 16GB"
                                  />
                                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => handleUpdateItem(item)}>
                                      <Save className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => item.id && handleDeleteItem(item.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            )}
                           </div>
                         </CardContent>
                        <CardFooter className="bg-white/[0.02] border-t border-white/5 p-4 text-[10px] text-gray-500 uppercase flex justify-between">
                          <span>{items.filter(i => i.page === 'produtos' && i.section === `${cat.id}_specs`).length} especificações</span>
                          <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> Hardware Corporativo</span>
                        </CardFooter>
                      </Card>
                    ))}
                 </div>
              </TabsContent>

              {/* Contato Content */}
              <TabsContent value="contato" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="bg-white/5 border-white/5 max-w-4xl mx-auto">
                  <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                    <CardTitle className="text-lg">Página de Contato</CardTitle>
                    <CardDescription>Textos e informações de contato</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {content.filter(c => c.page === 'contato').map(renderContentField)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Footer Content */}
              <TabsContent value="footer" className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/5 border-white/5">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                      <CardTitle className="text-lg">Configurações de Rodapé</CardTitle>
                      <CardDescription>Informações institucionais e redes sociais</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                       {content.filter(c => c.page === 'footer').length === 0 ? (
                         <div className="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-xl space-y-3">
                            <p className="text-xs text-gray-500 text-center">Nenhum item configurado para o rodapé.</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-[10px] h-7 border-primary/20 hover:bg-primary/10 text-primary"
                              onClick={handleSeedFooter}
                              disabled={saving === 'seed-footer'}
                            >
                              {saving === 'seed-footer' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
                              Carregar padrões
                            </Button>
                         </div>
                       ) : (
                         <div className="space-y-4">
                            {content.filter(c => c.page === 'footer').map(renderContentField)}
                         </div>
                       )}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/5">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                      <CardTitle className="text-lg">WhatsApp Global</CardTitle>
                      <CardDescription>Configurações centralizadas de atendimento</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                       {content.filter(c => c.page === 'global').length === 0 ? (
                         <div className="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-xl space-y-3">
                            <p className="text-xs text-gray-500 text-center">Configurações de WhatsApp não encontradas.</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-[10px] h-7 border-primary/20 hover:bg-primary/10 text-primary"
                              onClick={handleSeedFooter}
                              disabled={saving === 'seed-footer'}
                            >
                               Carregar padrões
                            </Button>
                         </div>
                       ) : (
                         <div className="space-y-4">
                            {content.filter(c => c.page === 'global').map(renderContentField)}
                            <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-[10px] text-primary/70 italic">
                               💡 O número de WhatsApp deve conter apenas dígitos (Ex: 5548913052259). Este número será usado em todos os botões do site.
                            </div>
                         </div>
                       )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
