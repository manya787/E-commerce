const pool = require('./db');

async function testConnection() {
  try {
    const [rows] = await pool.execute('SELECT 1');
    console.log('✅ MySQL Connected Successfully');
  } catch (err) {
    console.error('❌ MySQL Connection Failed:', err.message);
  }
}

testConnection();
