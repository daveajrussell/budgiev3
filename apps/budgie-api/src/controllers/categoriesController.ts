import { Category } from 'budgie-core';
import { CategoryRepository } from 'budgie-data';
import { Request, Response } from 'express';

class CategoriesController {
  private readonly _categoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  getCategories = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const categories = await this._categoryRepository.getAllAsync(
      1,
      parseInt((limit as string) ?? 10),
      parseInt((offset as string) ?? 0),
    );
    res.status(200).json(categories);
  };

  getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await this._categoryRepository.getByIdAsync(
      1,
      parseInt(id),
    );
    if (!category) res.status(404).json();
    res.status(200).json(category);
  };

  createCategory = async (req: Request, res: Response) => {
    const category = req.body as Category;
    const result = await this._categoryRepository.addAsync(1, category);
    res.status(201).json(result);
  };

  editCategory = async (req: Request, res: Response) => {
    const category = req.body as Category;
    try {
      await this._categoryRepository.updateAsync(1, category.id, category);
      res.status(204).json();
    } catch {
      res.status(500).json();
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._categoryRepository.deleteAsync(1, Number(id));
    res.status(204).json();
  };
}

const categoriesRepository = new CategoryRepository();
const categoriesController = new CategoriesController(categoriesRepository);
export default categoriesController;
