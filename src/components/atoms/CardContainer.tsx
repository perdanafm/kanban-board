import { ReactNode } from 'react';

const CardContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} w-full p-6 bg-white rounded-xl shadow-lg`}>
      {children}
    </div>
  );
};

export default CardContainer;
