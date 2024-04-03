import { ReactNode } from 'react';

type TableProps = {
  children?: ReactNode;
};

const TableComponent = ({
  tag: Tag,
  className,
  children,
}: { tag: keyof JSX.IntrinsicElements; className?: string } & TableProps) => (
  <Tag className={className}>{children}</Tag>
);

export const TableHeaderRow = ({ children }: TableProps) => {
  return (
    <TableComponent tag="thead">
      <tr>{children}</tr>
    </TableComponent>
  );
};

export const TableHeaderRowData = ({ children }: TableProps) => {
  return (
    <TableComponent
      tag="th"
      className="border border-t-0 border-r-0 border-l-0 border-gray-600"
    >
      {children}
    </TableComponent>
  );
};

export const TableBody = ({ children }: TableProps) => {
  return <TableComponent tag="tbody">{children}</TableComponent>;
};

export const TableBodyRow = ({ children }: TableProps) => {
  return <TableComponent tag="tr">{children}</TableComponent>;
};

export const TableBodyRowData = ({ children }: TableProps) => {
  return (
    <TableComponent
      tag="td"
      className="border border-t-0 border-r-0 border-l-0 border-gray-600 py-3"
    >
      {children}
    </TableComponent>
  );
};

export const Table = ({ children }: TableProps) => {
  return (
    <TableComponent
      tag="table"
      className="border-collapse table-auto w-full text-left text-sm"
    >
      {children}
    </TableComponent>
  );
};
