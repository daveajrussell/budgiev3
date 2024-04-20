import { Outlet } from 'react-router-dom';
import { TableRowValue } from '../../types/table-row-value';

export type AccountDto = {
  [key: string]: TableRowValue | undefined;
  id: number | undefined;
  name: TableRowValue;
  type: number;
  typeName: string | undefined;
  amount: number;
  color: string;
};

export const Accounts = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
