import { Entity } from './entity';

export interface Entry extends Entity {
  accountId: number;
  date: Date;
  amount: number;
}
