import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT),

  database: process.env.DB_NAME,
  
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('SQL Server connected');
    return pool;
  })
  .catch(error => {
    console.error('Database connection failed:', error);
    throw error;
  });

export default sql;