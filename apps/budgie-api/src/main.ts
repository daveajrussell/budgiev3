import { CategoryRepository } from 'budgie-data';
import cors from 'cors';
import express, { Request, Response } from 'express';

const corsOptions = {
  origin: 'http://localhost:5173',
} as cors.CorsOptions;
const app = express();
const port = process.env.PORT || 3001;
const categoryRepository = new CategoryRepository();

app.use(express.json());
app.use(cors(corsOptions));

app.get('/categories', async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const categories = await categoryRepository.getAllAsync(
    1,
    parseInt((limit as string) ?? 10),
    parseInt((offset as string) ?? 0),
  );
  res.status(200).json(categories);
});

app.get('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryRepository.getByIdAsync(1, parseInt(id));
  if (!category) res.status(404).json();
  res.status(200).json(category);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
