import { Account } from 'budgie-core';
import { AccountRepository } from 'budgie-data';
import { Request, Response } from 'express';

class AccountsController {
  private readonly _accountRepository: AccountRepository;
  constructor(accountRepository: AccountRepository) {
    this._accountRepository = accountRepository;
  }

  getAccounts = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const accounts = await this._accountRepository.getAllAsync(
      1,
      parseInt((limit as string) ?? 10),
      parseInt((offset as string) ?? 0),
    );
    res.status(200).json(accounts);
  };

  getAccountById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const account = await this._accountRepository.getByIdAsync(1, parseInt(id));
    if (!account) res.status(404).json();
    res.status(200).json(account);
  };

  createAccount = async (req: Request, res: Response) => {
    const account = req.body as Account;
    const result = await this._accountRepository.addAsync(1, account);
    res.status(201).json(result);
  };

  editAccount = async (req: Request, res: Response) => {
    const account = req.body as Account;
    try {
      await this._accountRepository.updateAsync(1, account.id, account);
      res.status(204).json();
    } catch {
      res.status(500).json();
    }
  };

  deleteAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._accountRepository.deleteAsync(1, Number(id));
    res.status(204).json();
  };
}

const accountsRepository = new AccountRepository();
const accountsController = new AccountsController(accountsRepository);
export default accountsController;
