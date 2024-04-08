import cors from 'cors';
import express from 'express';
import categoriesApi from './routes/categoriesRoutes';
import entriesApi from './routes/entriesRoutes';

const corsOptions = {
  origin: 'http://localhost:5173',
} as cors.CorsOptions;
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(corsOptions));
app.use(categoriesApi);
app.use(entriesApi);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
