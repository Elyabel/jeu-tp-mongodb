import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import gameRoutes from './routes/gameRoutes';
import { connectDB } from './config/db';

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/api', gameRoutes);

app.get('/', (req, res) => res.send('Coucouuuuu twa'));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
