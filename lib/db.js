import { Pool } from 'pg';

const pool = new Pool({
  user: 'doadmin',        // Προσαρμόστε τα στοιχεία σύνδεσης
  host: 'orders-do-user-20284434-0.k.db.ondigitalocean.com',       // Ή τη διεύθυνση του remote database
  database: 'defaultdb',
  password: 'AVNS_Mza68pHYplkmahOsK7T',
  port: 25060,
});

export default pool;
