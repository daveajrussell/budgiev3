import { Outlet } from 'react-router-dom';
import { TableRowValue } from '../../types/table-row-value';

export type CategoryDto = {
  [key: string]: TableRowValue | undefined;
  id: number | undefined;
  name: TableRowValue;
  typeValue: number;
  typeName: string | undefined;
  amount: number;
  color: string;
};

export const Categories = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
