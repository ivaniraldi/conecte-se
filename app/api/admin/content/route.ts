import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  const client = await pool.connect();
  try {
    const contentResult = await client.query('SELECT * FROM site_content');
    const itemsResult = await client.query('SELECT * FROM site_section_items ORDER BY order_index ASC');

    return NextResponse.json({
      content: contentResult.rows,
      items: itemsResult.rows,
    });
  } catch (err) {
    console.error('Error fetching admin content:', err);
    return NextResponse.json({ success: false, message: 'Erro ao buscar conteúdo' }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST(request: Request) {
  const client = await pool.connect();
  try {
    const { type, data } = await request.json();

    if (type === 'site_content') {
      const { page, section, key, value } = data;
      await client.query(
        `INSERT INTO site_content (page, section, key, value)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value`,
        [page, section, key, value]
      );
    } else if (type === 'site_section_item') {
      const { id, title, description, image_url, icon_name, href, order_index } = data;
      if (id) {
        await client.query(
          `UPDATE site_section_items 
           SET title = $1, description = $2, image_url = $3, icon_name = $4, href = $5, order_index = $6
           WHERE id = $7`,
          [title, description, image_url, icon_name, href, order_index, id]
        );
      } else {
        const { page, section } = data;
        await client.query(
          `INSERT INTO site_section_items (page, section, title, description, image_url, icon_name, href, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [page, section, title, description, image_url, icon_name, href, order_index]
        );
      }
    } else if (type === 'delete_section_item') {
      const { id } = data;
      await client.query('DELETE FROM site_section_items WHERE id = $1', [id]);
    }

    return NextResponse.json({ success: true, message: 'Conteúdo atualizado com sucesso' });
  } catch (err) {
    console.error('Error updating admin content:', err);
    return NextResponse.json({ success: false, message: 'Erro ao atualizar conteúdo' }, { status: 500 });
  } finally {
    client.release();
  }
}
