import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contenedorRoutes from './routes/contenedor.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contenedores', contenedorRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});