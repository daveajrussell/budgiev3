import { Category } from 'budgie-core';
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

app.post('/categories', async (req: Request, res: Response) => {
  const category = req.body as Category;
  const result = await categoryRepository.addAsync(1, category);
  res.status(201).json(result);
});

app.put('/categories', async (req: Request, res: Response) => {
  const category = req.body as Category;
  try {
    await categoryRepository.updateAsync(1, category.id, category);
    res.status(204).json();
  } catch {
    res.status(500).json();
  }
});

app.delete('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryRepository.deleteAsync(1, Number(id));
  res.status(204).json();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
