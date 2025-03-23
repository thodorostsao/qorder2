// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'doadmin',        // Το username
  host: 'orders-do-user-20284434-0.k.db.ondigitalocean.com', // Ο διακομιστής της βάσης δεδομένων
  database: 'defaultdb',  // Το όνομα της βάσης δεδομένων
  password: 'AVNS_Mza68pHYplkmahOsK7T', // Ο κωδικός
  port: 25060,            // Η θύρα σύνδεσης
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
