import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const corsOptions = {
  origin: 'http://localhost:5173',
} as cors.CorsOptions;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = process.env.PORT || 3001;

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
