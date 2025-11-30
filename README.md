# Conecte-Se - Website Corporativo

Website corporativo da Conecte-Se, representante oficial especializada em soluções de tecnologia para empresas e órgãos públicos.

## 🚀 Tecnologias

- **Next.js 15** - Framework React de última geração
- **TypeScript** - Tipagem estática para código mais robusto
- **Tailwind CSS 4** - Framework CSS moderno e responsivo
- **Radix UI** - Componentes acessíveis e customizáveis

## 📋 Estrutura do Projeto

```
website-build/
├── app/                    # Páginas da aplicação (Next.js App Router)
│   ├── contato/           # Página de contato
│   ├── diferenciais/      # Página de diferenciais
│   ├── produtos/          # Catálogo de produtos
│   │   ├── all-in-one/    # PCs All in One
│   │   ├── gamer/         # PCs Gamer/Estação Técnica
│   │   ├── mid-tower/     # PCs Mid Tower
│   │   ├── monitores/     # Monitores
│   │   ├── perifericos/   # Periféricos
│   │   └── slim/          # PCs Slim/SFF
│   └── quem-somos/        # Página institucional
├── components/            # Componentes React
│   └── ui/               # Componentes de UI (Radix UI)
├── public/               # Arquivos estáticos
└── package.json          # Dependências do projeto
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Instalar dependências

```bash
pnpm install
```

### Executar em modo desenvolvimento

```bash
pnpm dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para produção

```bash
pnpm build
```

### Executar versão de produção

```bash
pnpm start
```

## 📝 Customização

### Logo e Imagens

Substitua os placeholders em `/public/`:
- `placeholder-logo.svg` - Logo da empresa
- `placeholder.svg` - Imagens de produtos

### Informações de Contato

Atualize o número do WhatsApp nos componentes:
- `components/header.tsx`
- `components/whatsapp-button.tsx`
- Páginas de produtos em `app/produtos/*/page.tsx`

Formato atual: `5548913052259` (altere para seu número)

### Cores e Estilos

As cores principais estão definidas em `app/globals.css`:
- `--primary` - Cor primária (#1bc8bf turquesa)
- `--background` - Cor de fundo
- `--foreground` - Cor do texto

## 📦 Produtos

O site apresenta as seguintes categorias de produtos:

- **Mid Tower** - Equipamentos modulares e robustos
- **Slim/SFF** - PCs compactos com sensor de intrusão
- **All in One** - Soluções integradas com tela
- **Gamer/Estação Técnica** - Alto desempenho profissional
- **Monitores** - Linha completa corporativa
- **Periféricos** - Acessórios e complementos

## 🎨 Identidade Visual

O site utiliza:
- Tipografia: Inter (sans-serif)
- Paleta de cores escura (dark theme)
- Cor primária: Turquesa (#1bc8bf)
- Design moderno e corporativo
- Animações sutis e profissionais

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🔧 Manutenção

### Adicionar novo produto

1. Criar pasta em `app/produtos/[nome-produto]/`
2. Criar arquivo `page.tsx` com as especificações
3. Adicionar ao array de produtos em `app/produtos/page.tsx`
4. Atualizar componente `components/products.tsx` se necessário

### Atualizar conteúdo

As páginas institucionais estão em:
- `app/quem-somos/page.tsx` - Sobre a empresa
- `app/diferenciais/page.tsx` - Diferenciais competitivos
- `app/contato/page.tsx` - Formulário de contato

## 📄 Licença

© 2025 SykoTech. Todos os direitos reservados.
# conecte-se
