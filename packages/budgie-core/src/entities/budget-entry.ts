import { Entity } from './entity';

export interface BudgetEntry extends Entity {
  categoryId: number;
  date: Date;
  amount: number;
}
