import { Category } from '../entities/category';
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
      'SELECT name, type, amount, color FROM categories WHERE userId = ? LIMIT ? OFFSET ?',
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
      'SELECT name, type, amount, color FROM categories WHERE userId = ? AND id = ? LIMIT 1',
      userId,
      id,
    );
  }

  async addAsync(userId: number, entity: Category): Promise<void> {
    console.log(userId, entity);
    throw new Error('Method not implemented.');
  }

  async updateAsync(
    userId: number,
    id: number,
    entity: Category,
  ): Promise<void> {
    console.log(userId, id, entity);
    throw new Error('Method not implemented.');
  }

  async deleteAsync(userId: number, id: number): Promise<void> {
    console.log(userId, id);
    throw new Error('Method not implemented.');
  }
}
