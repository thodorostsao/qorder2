import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { table, items, comments } = req.body;

    try {
      // Ξεκινάμε τη συναλλαγή για να διασφαλίσουμε ότι όλα τα δεδομένα αποθηκεύονται σωστά
      const client = await pool.connect();
      await client.query('BEGIN');
      
      // Εισάγουμε την παραγγελία
      const orderRes = await client.query(
        'INSERT INTO orders (table_number, comments) VALUES ($1, $2) RETURNING id',
        [table, comments]
      );
      const orderId = orderRes.rows[0].id;

      // Εισάγουμε τα προϊόντα της παραγγελίας
      for (let item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, item_name, sugar, milk, price) VALUES ($1, $2, $3, $4, $5)',
          [orderId, item.name, item.sugar, item.milk, item.price]
        );
      }

      await client.query('COMMIT');
      client.release();

      res.status(200).json({ message: 'Order received and saved', orderId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing the order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
