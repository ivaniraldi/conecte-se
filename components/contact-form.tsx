"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Building2, FileText, User, MessageSquare, Phone } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    cnpj: "",
    telefone: "",
    produto: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `Olá! Meu nome é ${formData.nome}.\n\nEmpresa: ${formData.empresa}\nCNPJ: ${formData.cnpj}\nTelefone: ${formData.telefone}\nProduto de interesse: ${formData.produto}\n\nMensagem: ${formData.mensagem}`

    const whatsappLink = `https://wa.me/5548913052259?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border backdrop-blur-sm p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="nome" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary" />
                Nome Completo
              </Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome"
                className="bg-background/50"
              />
            </div>

            <div>
              <Label htmlFor="empresa" className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-primary" />
                Empresa
              </Label>
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                placeholder="Nome da empresa"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cnpj" className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-primary" />
                CNPJ
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                placeholder="00.000.000/0000-00"
                className="bg-background/50"
              />
            </div>

            <div>
              <Label htmlFor="telefone" className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-primary" />
                Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
                className="bg-background/50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="produto" className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Produto de Interesse
            </Label>
            <select
              id="produto"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Selecione um produto</option>
              <option value="Mid Tower">Mid Tower</option>
              <option value="Slim / SFF">Slim / SFF</option>
              <option value="All in One">All in One</option>
              <option value="Gamer / Estação Técnica">Gamer / Estação Técnica</option>
              <option value="Monitores">Monitores</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <Label htmlFor="mensagem" className="mb-2 block">
              Mensagem (opcional)
            </Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Descreva suas necessidades ou faça perguntas..."
              rows={5}
              className="bg-background/50"
            />
          </div>

          <Button type="submit" size="lg" className="w-full text-lg">
            Enviar via WhatsApp
          </Button>
        </form>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6 text-center">
        <div className="p-6 rounded-xl bg-card/50 border border-border">
          <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">WhatsApp</h3>
          <p className="text-sm text-muted-foreground">+55 48 9130-5259</p>
        </div>
        <div className="p-6 rounded-xl bg-card/50 border border-border">
          <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Atendimento</h3>
          <p className="text-sm text-muted-foreground">Nacional</p>
        </div>
      </div>
    </div>
  )
}
