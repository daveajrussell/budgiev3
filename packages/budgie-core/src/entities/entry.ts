import { Entity } from './entity';

export interface Entry extends Entity {
  categoryId: number;
  date: Date;
  amount: number;
}
