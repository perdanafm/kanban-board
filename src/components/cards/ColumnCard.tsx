import { ReactNode } from 'react';

interface IColumnCard {
  title: string;
  children: ReactNode;
}

const ColumnCard = ({ title, children }: IColumnCard) => {
  return (
    <div className='relative space-y-6 '>
      <p className='text-sm font-semibold'>{title}</p>
      {children}
    </div>
  );
};
export default ColumnCard;
