import { Entry } from 'budgie-core';
import { EntryRepository } from 'budgie-data';
import { Request, Response } from 'express';

class EntriesController {
  private readonly _entryRepository: EntryRepository;
  constructor() {
    this._entryRepository = new EntryRepository();
  }

  getEntries = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const entries = await this._entryRepository.getAllAsync(
      1,
      parseInt((limit as string) ?? 10),
      parseInt((offset as string) ?? 0),
    );
    res.status(200).json(entries);
  };

  getEntryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const entry = await this._entryRepository.getByIdAsync(1, parseInt(id));
    if (!entry) res.status(404).json();
    res.status(200).json(entry);
  };

  createEntry = async (req: Request, res: Response) => {
    const entry = req.body as Entry;
    const result = await this._entryRepository.addAsync(1, entry);
    res.status(201).json(result);
  };

  editEntry = async (req: Request, res: Response) => {
    const entry = req.body as Entry;
    try {
      await this._entryRepository.updateAsync(1, entry.id, entry);
      res.status(204).json();
    } catch {
      res.status(500).json();
    }
  };

  deleteEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._entryRepository.deleteAsync(1, Number(id));
    res.status(204).json();
  };
}

const entriesController = new EntriesController();
export default entriesController;
