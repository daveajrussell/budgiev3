export interface Repository<T> {
  getAllAsync(userId: number, limit: number, offset: number): Promise<Array<T>>;
  getByIdAsync(userId: number, id: number): Promise<T | undefined>;
  addAsync(userId: number, entity: T): Promise<void>;
  updateAsync(userId: number, id: number, entity: T): Promise<void>;
  deleteAsync(userId: number, id: number): Promise<void>;
}
