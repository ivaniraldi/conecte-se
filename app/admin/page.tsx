"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Login realizado com sucesso!")
        router.push("/admin/dashboard")
      } else {
        setError(data.message || "Credenciais inválidas")
        toast.error(data.message || "Credenciais inválidas")
      }
    } catch (error) {
      setError("Ocorreu um erro ao conectar com o servidor")
      toast.error("Ocorreu um erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full animate-float" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
        
        <CardHeader className="space-y-2 pb-8 relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 relative">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Acesso Restrito
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-400">
            Painel de Administração <span className="text-primary font-medium">Conecte-Se</span>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin} className="relative">
          <CardContent className="space-y-5">
            {error && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-bold">Falha na Autenticação</AlertTitle>
                  <AlertDescription className="text-xs opacity-90">
                    {error}. Por favor, verifique suas credenciais e tente novamente.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">
                E-mail Corporativo
              </Label>
              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within/input:text-primary transition-colors duration-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@conectese.com"
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Senha de Acesso
                </Label>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within/input:text-primary transition-colors duration-300" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-6 pb-8">
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_oklch(var(--primary))] transition-all active:scale-[0.98] rounded-xl" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Validando...
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="absolute bottom-8 text-xs text-gray-500 tracking-widest uppercase font-medium">
        Conecte-Se &copy; {new Date().getFullYear()} &bull; Gestão de Conteúdo
      </div>
    </div>
  )
}
