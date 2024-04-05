import { Category, CategoryType } from 'budgie-core';
import { Repository } from './repository';
import { RepositoryBase } from './repositoryBase';

export class CategoryRepository
  extends RepositoryBase
  implements Repository<Category>
{
  async getAllAsync(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<Category[]> {
    return this.queryAsync(
      'SELECT id, name, type, amount, color FROM categories WHERE userId = ? LIMIT ? OFFSET ?',
      userId,
      limit,
      offset,
    );
  }

  async getByIdAsync(
    userId: number,
    id: number,
  ): Promise<Category | undefined> {
    return this.queryAsync(
      'SELECT id, name, type, amount, color FROM categories WHERE userId = ? AND id = ? LIMIT 1',
      userId,
      id,
    );
  }

  async addAsync(userId: number, entity: Category): Promise<Category> {
    const result = await this.queryAsync(
      `
        INSERT INTO categories (userId, name, type, amount, color) VALUES (?, ?, ?, ?, ?)
        RETURNING id, name, type, amount, color
      `,
      userId,
      entity.name,
      CategoryType[entity.type],
      entity.amount,
      entity.color,
    );
    return result[0];
  }

  async updateAsync(
    userId: number,
    id: number,
    entity: Category,
  ): Promise<void> {
    return this.queryAsync(
      'UPDATE categories SET name = ?, type = ?, amount = ?, color = ? WHERE id = ? and userId = ?',
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
      'DELETE FROM categories WHERE id = ? and userId = ?',
      id,
      userId,
    );
  }
}
