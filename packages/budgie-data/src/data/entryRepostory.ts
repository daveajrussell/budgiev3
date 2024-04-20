import { Entry } from 'budgie-core';
import { Repository } from './repository';
import { RepositoryBase } from './repositoryBase';

export class EntryRepository
  extends RepositoryBase
  implements Repository<Entry>
{
  async getAllAsync(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<Entry[]> {
    return this.queryAsync(
      'SELECT id, accountId, date, amount FROM entries WHERE userId = ? LIMIT ? OFFSET ?',
      userId,
      limit,
      offset,
    );
  }

  async getByIdAsync(userId: number, id: number): Promise<Entry | undefined> {
    return this.queryAsync(
      'SELECT id, accountId, date, amount FROM entries WHERE userId = ? AND id = ? LIMIT 1',
      userId,
      id,
    );
  }

  async addAsync(userId: number, entity: Entry): Promise<Entry> {
    const result = await this.queryAsync(
      `
          INSERT INTO entries (userId, accountId, date, amount) VALUES (?, ?, ?, ?)
          RETURNING id, accountId, date, amount
        `,
      userId,
      entity.accountId,
      entity.date,
      entity.amount,
    );
    return result[0];
  }

  async updateAsync(userId: number, id: number, entity: Entry): Promise<void> {
    return this.queryAsync(
      'UPDATE entries SET accountId = ?, date = ?, amount = ? WHERE id = ? and userId = ?',
      entity.accountId,
      entity.date,
      entity.amount,
      id,
      userId,
    );
  }

  async deleteAsync(userId: number, id: number): Promise<void> {
    return this.queryAsync(
      'DELETE FROM entries WHERE id = ? and userId = ?',
      id,
      userId,
    );
  }
}
