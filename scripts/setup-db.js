require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function setup() {
  console.log('--- Setting up database tables ---');

  const client = await pool.connect();
  try {
    // Create site_content table
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        page VARCHAR(50) NOT NULL,
        section VARCHAR(100) NOT NULL,
        key VARCHAR(100) NOT NULL,
        value TEXT NOT NULL,
        type VARCHAR(20) DEFAULT 'text',
        UNIQUE(page, section, key)
      );
    `);

    // Create site_section_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_section_items (
        id SERIAL PRIMARY KEY,
        page VARCHAR(50) NOT NULL,
        section VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        image_url TEXT,
        icon_name VARCHAR(50),
        href VARCHAR(255),
        order_index INTEGER DEFAULT 0
      );
    `);

    console.log('--- Seeding initial data ---');

    // Home Hero
    const homeHero = [
      { page: 'home', section: 'hero', key: 'title', value: 'Soluções Corporativas em <span class="text-primary">Tecnologia</span> e Hardware', type: 'text' },
      { page: 'home', section: 'hero', key: 'description', value: 'Representante oficial especializada em equipamentos de tecnologia para empresas e órgãos públicos. Qualidade, suporte técnico e soluções personalizadas para seu negócio.', type: 'text' },
      { page: 'home', section: 'hero', key: 'image', value: '/modern-technology-circuit-board-with-blue-lights-a.jpg', type: 'image' },
      { page: 'home', section: 'hero', key: 'button1_text', value: 'Solicitar Cotação', type: 'text' },
      { page: 'home', section: 'hero', key: 'button2_text', value: 'Fale com consultor', type: 'text' },
      { page: 'home', section: 'hero', key: 'whatsapp_link', value: 'https://wa.me/5548913052259?text=Olá! Gostaria de solicitar um orçamento.', type: 'link' },
    ];

    for (const item of homeHero) {
      await client.query(`
        INSERT INTO site_content (page, section, key, value, type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type
      `, [item.page, item.section, item.key, item.value, item.type]);
    }

    // Home Highlights
    const homeHighlights = [
      { page: 'home', section: 'highlights', title: 'Representante Oficial', description: 'Parceiro autorizado das melhores marcas', icon_name: 'Award', order_index: 0 },
      { page: 'home', section: 'highlights', title: 'Atendimento Consultivo', description: 'Suporte técnico especializado', icon_name: 'Wrench', order_index: 1 },
      { page: 'home', section: 'highlights', title: 'Qualidade Garantida', description: 'Produtos certificados e testados', icon_name: 'Shield', order_index: 2 },
      { page: 'home', section: 'highlights', title: 'Especialistas em Licitações', description: 'Experiência no setor público', icon_name: 'FileText', order_index: 3 },
    ];

    await client.query(`DELETE FROM site_section_items WHERE page = 'home' AND section = 'highlights'`);
    for (const item of homeHighlights) {
      await client.query(`
        INSERT INTO site_section_items (page, section, title, description, icon_name, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [item.page, item.section, item.title, item.description, item.icon_name, item.order_index]);
    }

    // Home Products
    const homeProducts = [
      { page: 'home', section: 'products', title: 'Mid Tower', href: '/produtos/mid-tower', icon_name: 'PcCase', order_index: 0 },
      { page: 'home', section: 'products', title: 'Slim / SFF', href: '/produtos/slim', icon_name: 'Laptop', order_index: 1 },
      { page: 'home', section: 'products', title: 'All in One', href: '/produtos/all-in-one', icon_name: 'TvMinimalPlay', order_index: 2 },
      { page: 'home', section: 'products', title: 'Gamer / Estação Técnica', href: '/produtos/gamer', icon_name: 'Gamepad2', order_index: 3 },
      { page: 'home', section: 'products', title: 'Monitores', href: '/produtos/monitores', icon_name: 'Monitor', order_index: 4 },
      { page: 'home', section: 'products', title: 'Periféricos', href: '/produtos/perifericos', icon_name: 'Keyboard', order_index: 5 },
    ];

    await client.query(`DELETE FROM site_section_items WHERE page = 'home' AND section = 'products'`);
    for (const item of homeProducts) {
      await client.query(`
        INSERT INTO site_section_items (page, section, title, href, icon_name, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [item.page, item.section, item.title, item.href, item.icon_name, item.order_index]);
    }

    // Diferenciais Page
    const differentialsContent = [
      { page: 'diferenciais', section: 'hero', key: 'title', value: 'Por que escolher a Conecte-Se', type: 'text' },
      { page: 'diferenciais', section: 'hero', key: 'description', value: 'Representante oficial com expertise em soluções corporativas, oferecendo produtos de qualidade com suporte técnico especializado e atendimento consultivo', type: 'text' },
    ];

    for (const item of differentialsContent) {
      await client.query(`
        INSERT INTO site_content (page, section, key, value, type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type
      `, [item.page, item.section, item.key, item.value, item.type]);
    }

    const differentialsList = [
      { page: 'diferenciais', section: 'features', title: 'Processadores Personalizados', description: 'Configurações com Intel 1ª à 14ª geração e AMD sob medida', icon_name: 'Cpu', order_index: 0 },
      { page: 'diferenciais', section: 'features', title: 'Memória Flexível', description: 'DDR3, DDR4 ou DDR5 de acordo com sua necessidade', icon_name: 'MemoryStick', order_index: 1 },
      { page: 'diferenciais', section: 'features', title: 'Armazenamento Híbrido', description: 'SSD, HD ou configurações híbridas para performance ideal', icon_name: 'HardDrive', order_index: 2 },
      { page: 'diferenciais', section: 'features', title: 'Compatibilidade Linux', description: 'Linux padrão ou Windows opcional', icon_name: 'Settings', order_index: 3 },
      { page: 'diferenciais', section: 'features', title: 'Sensor de Intrusão', description: 'Opções com segurança física integrada (Slim/SFF)', icon_name: 'Shield', order_index: 4 },
      { page: 'diferenciais', section: 'features', title: 'Fonte Otimizada', description: 'Fontes silenciosas ou externas para diferentes formatos', icon_name: 'Zap', order_index: 5 },
      { page: 'diferenciais', section: 'features', title: 'Design Técnico', description: 'Projetos funcionais em Mid Tower, Gamer e All-in-One', icon_name: 'Award', order_index: 6 },
      { page: 'diferenciais', section: 'features', title: 'Licitações e Locações', description: 'Suporte completo para contratos públicos e corporativos', icon_name: 'FileText', order_index: 7 },
    ];

    await client.query(`DELETE FROM site_section_items WHERE page = 'diferenciais' AND section = 'features'`);
    for (const item of differentialsList) {
      await client.query(`
        INSERT INTO site_section_items (page, section, title, description, icon_name, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [item.page, item.section, item.title, item.description, item.icon_name, item.order_index]);
    }

    // Product Details & Specifications
    const productsToSeed = [
      {
        slug: 'mid-tower',
        title: 'Mid Tower',
        subtitle: 'Equipamento Modular e Robusto',
        description: 'Solução ideal para ambientes corporativos que necessitam de expansibilidade e facilidade de manutenção. Gabinete robusto com ventilação otimizada e compatibilidade com placas ATX.',
        icon_name: 'PcCase',
        specs: [
          "Placas compatíveis: ATX / Micro ATX",
          "Fonte interna ATX",
          "Gabinete metálico, ventilação otimizada",
          "Processadores: Intel 1ª–14ª geração ou AMD",
          "Memória: DDR3 / DDR4 / DDR5",
          "Armazenamento: SSD / HD / NVMe",
          "SO: Linux (padrão) / Windows (opcional)",
          "Upgrades: slots livres, fácil manutenção",
          "Cores: preto ou branco",
          "Garantia: 1 ano por peça",
          "Certificações: ISO 9001:2015 / PPB / Microsoft Partner"
        ]
      },
      {
        slug: 'slim',
        title: 'PC SLIM SFF',
        subtitle: 'Organização, eficiência e ocupação reduzida',
        description: 'Projetado para ambientes que demandam organização, eficiência e ocupação reduzida, o PC SLIM SFF entrega alto desempenho em um gabinete compacto, ideal para estações de trabalho corporativas.',
        icon_name: 'Laptop',
        specs: [
          "Formato SFF (Small Form Factor)",
          "Sensor de intrusão de chassi",
          "Placa-mãe: Micro ATX",
          "Fonte externa: 250 W ou 300 W",
          "Cores: preto ou branco",
          "Processadores: Intel 1ª–14ª gen ou AMD",
          "Memória: DDR3 / DDR4 / DDR5",
          "Armazenamento: SSD NVMe / SATA / HD",
          "SO: Linux / Windows sob solicitação",
          "Upgrades: RAM e armazenamento",
          "Garantia: 1 ano",
          "Certificações: ISO 9001:2015 / PPB / Microsoft Partner"
        ]
      },
      // I'll add the others as placeholders or common initial data
      {
        slug: 'all-in-one',
        title: 'All in One',
        subtitle: 'Design Integrado e Elegante',
        description: 'Equipamento que integra monitor e computador em uma única peça, economizando espaço e reduzindo cabos.',
        icon_name: 'TvMinimalPlay',
        specs: ["Monitor integrado", "Processadores Intel/AMD", "Fácil instalação"]
      },
      {
        slug: 'gamer',
        title: 'Gamer / Estação Técnica',
        subtitle: 'Alta Performance para Projetos Exigentes',
        description: 'Desenvolvido para editores de vídeo, engenheiros e gamers que não abrem mão de potência.',
        icon_name: 'Gamepad2',
        specs: ["GPU Dedicada", "Refrigeração Avançada", "Estética Gamer"]
      },
      {
        slug: 'monitores',
        title: 'Monitores',
        subtitle: 'Visualização nítida para produtividade',
        description: 'Gama completa de monitores com diferentes resoluções e tamanhos para atender sua demanda.',
        icon_name: 'Monitor',
        specs: ["Frequência otimizada", "Cores vibrantes", "Ajuste ergonômico"]
      },
      {
        slug: 'perifericos',
        title: 'Periféricos',
        subtitle: 'Acessórios que completam sua experiência',
        description: 'Teclados, mouses e headsets de alta durabilidade para uso contínuo.',
        icon_name: 'Keyboard',
        specs: ["Durabilidade industrial", "Precisão técnica", "Ergonomia"]
      }
    ];

    for (const product of productsToSeed) {
      // General content for the product detail page
      const content = [
        { page: `product_${product.slug}`, section: 'header', key: 'title', value: product.title, type: 'text' },
        { page: `product_${product.slug}`, section: 'header', key: 'subtitle', value: product.subtitle, type: 'text' },
        { page: `product_${product.slug}`, section: 'header', key: 'description', value: product.description, type: 'text' },
        { page: `product_${product.slug}`, section: 'header', key: 'icon_name', value: product.icon_name, type: 'text' }
      ];

      for (const item of content) {
        await client.query(`
          INSERT INTO site_content (page, section, key, value, type)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type
        `, [item.page, item.section, item.key, item.value, item.type]);
      }

      // Specs list
      await client.query(`DELETE FROM site_section_items WHERE page = $1 AND section = 'specs'`, [`product_${product.slug}`]);
      for (let i = 0; i < product.specs.length; i++) {
        await client.query(`
          INSERT INTO site_section_items (page, section, title, order_index)
          VALUES ($1, 'specs', $2, $3)
        `, [`product_${product.slug}`, product.specs[i], i]);
      }
    }

    // Quem Somos & Contato (re-seed or ensure)
    const extraContent = [
      { page: 'quem-somos', section: 'hero', key: 'title', value: 'Conecte-Se: Seu Parceiro em Soluções Tecnológicas Corporativas', type: 'text' },
      { page: 'contato', section: 'hero', key: 'title', value: 'Entre em Contato', type: 'text' },
    ];

    for (const item of extraContent) {
      await client.query(`
        INSERT INTO site_content (page, section, key, value, type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type
      `, [item.page, item.section, item.key, item.value, item.type]);
    }

    console.log('--- Database setup complete ---');
  } catch (err) {
    console.error('Error setting up database:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

setup().catch((err) => {
  console.error(err);
  process.exit(1);
});
