import { BudgetEntry } from 'budgie-core';
import { Repository } from './repository';
import { RepositoryBase } from './repositoryBase';

export class BudgetEntryRepository
  extends RepositoryBase
  implements Repository<BudgetEntry>
{
  async getAllAsync(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<BudgetEntry[]> {
    return this.queryAsync(
      'SELECT id, categoryId, date, amount FROM budget_entries WHERE userId = ? LIMIT ? OFFSET ?',
      userId,
      limit,
      offset,
    );
  }

  async getByIdAsync(
    userId: number,
    id: number,
  ): Promise<BudgetEntry | undefined> {
    return this.queryAsync(
      'SELECT id, categoryId, date, amount FROM budget_entries WHERE userId = ? AND id = ? LIMIT 1',
      userId,
      id,
    );
  }

  async addAsync(userId: number, entity: BudgetEntry): Promise<BudgetEntry> {
    const result = await this.queryAsync(
      `
          INSERT INTO budget_entries (userId, categoryId, date, amount) VALUES (?, ?, ?, ?)
          RETURNING id, categoryId, date, amount
        `,
      userId,
      entity.categoryId,
      entity.date,
      entity.amount,
    );
    return result[0];
  }

  async updateAsync(
    userId: number,
    id: number,
    entity: BudgetEntry,
  ): Promise<void> {
    return this.queryAsync(
      'UPDATE budget_entries SET categoryId = ?, date = ?, amount = ? WHERE id = ? and userId = ?',
      entity.categoryId,
      entity.date,
      entity.amount,
      id,
      userId,
    );
  }

  async deleteAsync(userId: number, id: number): Promise<void> {
    return this.queryAsync(
      'DELETE FROM budget_entries WHERE id = ? and userId = ?',
      id,
      userId,
    );
  }
}
