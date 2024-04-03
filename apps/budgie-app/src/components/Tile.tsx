import { ReactNode } from 'react';

type TileProps = {
  title?: string;
  children?: ReactNode;
};

export const Tile = ({ title, children }: TileProps) => {
  return (
    <>
      <div className="border rounded-md shadow-sm box-content p-4 flex flex-col space-y-3 min-h-48">
        <h4>{title}</h4>
        <div className="h-full">{children}</div>
      </div>
    </>
  );
};
