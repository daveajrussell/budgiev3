import { BudgetEntry } from 'budgie-core';
import { BudgetEntryRepository } from 'budgie-data';
import { Request, Response } from 'express';

class BudgetEntryController {
  private readonly _budgetEntryRepository: BudgetEntryRepository;
  constructor() {
    this._budgetEntryRepository = new BudgetEntryRepository();
  }

  getBudgetEntries = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const budgetEntries = await this._budgetEntryRepository.getAllAsync(
      1,
      parseInt((limit as string) ?? 10),
      parseInt((offset as string) ?? 0),
    );
    res.status(200).json(budgetEntries);
  };

  getBudgetEntryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const budgetEntry = await this._budgetEntryRepository.getByIdAsync(
      1,
      parseInt(id),
    );
    if (!budgetEntry) res.status(404).json();
    res.status(200).json(budgetEntry);
  };

  createBudgetEntry = async (req: Request, res: Response) => {
    const budgetEntry = req.body as BudgetEntry;
    const result = await this._budgetEntryRepository.addAsync(1, budgetEntry);
    res.status(201).json(result);
  };

  editBudgetEntry = async (req: Request, res: Response) => {
    const budgetEntry = req.body as BudgetEntry;
    try {
      await this._budgetEntryRepository.updateAsync(
        1,
        budgetEntry.id,
        budgetEntry,
      );
      res.status(204).json();
    } catch {
      res.status(500).json();
    }
  };

  deleteBudgetEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._budgetEntryRepository.deleteAsync(1, Number(id));
    res.status(204).json();
  };
}

const budgetEntryController = new BudgetEntryController();
export default budgetEntryController;
