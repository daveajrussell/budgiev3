import { Account } from 'budgie-core';
import { Repository } from './repository';
import { RepositoryBase } from './repositoryBase';

export class AccountRepository
  extends RepositoryBase
  implements Repository<Account>
{
  async getAllAsync(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<Account[]> {
    return this.queryAsync(
      'SELECT id, name, type, amount, color FROM accounts WHERE userId = ? LIMIT ? OFFSET ?',
      userId,
      limit,
      offset,
    );
  }

  async getByIdAsync(userId: number, id: number): Promise<Account | undefined> {
    return this.queryAsync(
      'SELECT id, name, type, amount, color FROM accounts WHERE userId = ? AND id = ? LIMIT 1',
      userId,
      id,
    );
  }

  async addAsync(userId: number, entity: Account): Promise<Account> {
    const result = await this.queryAsync(
      `
        INSERT INTO accounts (userId, name, type, amount, color) VALUES (?, ?, ?, ?, ?)
        RETURNING id, name, type, amount, color
      `,
      userId,
      entity.name,
      entity.type,
      entity.amount,
      entity.color,
    );
    return result[0];
  }

  async updateAsync(
    userId: number,
    id: number,
    entity: Account,
  ): Promise<void> {
    return this.queryAsync(
      'UPDATE accounts SET name = ?, type = ?, amount = ?, color = ? WHERE id = ? and userId = ?',
      entity.name,
      entity.type,
      entity.amount,
      entity.color,
      id,
      userId,
    );
  }

  async deleteAsync(userId: number, id: number): Promise<void> {
    return this.queryAsync(
      'DELETE FROM accounts WHERE id = ? and userId = ?',
      id,
      userId,
    );
  }
}
