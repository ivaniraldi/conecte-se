import { pool } from './db';

export async function getSiteContent(page: string) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT key, value, type FROM site_content WHERE page = $1', [page]);
    const content: Record<string, string> = {};
    result.rows.forEach(row => {
      content[row.key] = row.value;
    });
    return content;
  } catch (err) {
    console.error('Error fetching site content:', err);
    return {};
  } finally {
    client.release();
  }
}

export async function getSectionItems(page: string, section: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, title, description, image_url, icon_name, href FROM site_section_items WHERE page = $1 AND section = $2 ORDER BY order_index ASC',
      [page, section]
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching section items:', err);
    return [];
  } finally {
    client.release();
  }
}
export async function getWhatsAppLink() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT key, value FROM site_content WHERE page = 'global' AND section = 'whatsapp'"
    );
    const content: Record<string, string> = {};
    result.rows.forEach(row => {
      content[row.key] = row.value;
    });
    
    const number = content['whatsapp_number'] || '5548913052259';
    const message = content['whatsapp_message'] || 'Olá! Gostaria de mais informações.';
    
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  } catch (err) {
    console.error('Error fetching whatsapp link:', err);
    return 'https://wa.me/5548913052259';
  } finally {
    client.release();
  }
}
