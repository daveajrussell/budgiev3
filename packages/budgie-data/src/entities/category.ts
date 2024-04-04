import { CategoryType } from './category-type';
import { Entity } from './entity';

export interface Category extends Entity {
  name: string;
  type: CategoryType;
  amount: number;
  color: string;
}
