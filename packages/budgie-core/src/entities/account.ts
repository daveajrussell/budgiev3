import { AccountType } from './account-type';
import { Entity } from './entity';

export interface Account extends Entity {
  name: string;
  type: AccountType;
  amount: number;
  color: string;
}
