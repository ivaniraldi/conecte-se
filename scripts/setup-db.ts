import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
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
      { page: 'home', section: 'products', title: 'Mid Tower', href: '/produtos/mid-tower', icon_name: 'Pc', order_index: 0 },
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

    // Quem Somos
    const quemSomosHero = [
      { page: 'quem-somos', section: 'hero', key: 'title', value: 'Conecte-Se: Seu Parceiro em Soluções Tecnológicas Corporativas', type: 'text' },
      { page: 'quem-somos', section: 'hero', key: 'description', value: 'Somos uma representante oficial especializada em fornecer soluções corporativas de tecnologia para empresas e órgãos públicos. Conectamos você às melhores marcas e produtos do mercado com suporte técnico especializado e atendimento personalizado.', type: 'text' },
      { page: 'quem-somos', section: 'hero', key: 'whatsapp_link', value: 'https://wa.me/5548913052259?text=Olá! Gostaria de saber mais sobre a empresa.', type: 'link' },
    ];

    for (const item of quemSomosHero) {
      await client.query(`
        INSERT INTO site_content (page, section, key, value, type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type
      `, [item.page, item.section, item.key, item.value, item.type]);
    }

    // Contato
    const contatoHero = [
      { page: 'contato', section: 'hero', key: 'title', value: 'Entre em Contato', type: 'text' },
      { page: 'contato', section: 'hero', key: 'description', value: 'Solicite uma cotação personalizada para sua empresa ou órgão público', type: 'text' },
    ];

    for (const item of contatoHero) {
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
