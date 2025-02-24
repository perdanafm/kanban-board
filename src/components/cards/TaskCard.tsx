import { useNavigate } from 'react-router-dom';
import CardContainer from '../atoms/CardContainer';
import Chips from '../atoms/Chips';
import { CategoryType } from '@/constants/types';

interface ITaskCard {
  id: string;
  title: string;
  desc: string;
  type: CategoryType[];
}

const TaskCard = ({ id, title, desc, type }: ITaskCard) => {
  const navigate = useNavigate();
  const handleToDetail = (id: string) => {
    navigate(id);
  };
  return (
    <CardContainer>
      <h1
        onClick={() => handleToDetail(id)}
        className='overflow-hidden text-clip cursor-pointer hover:underline sm:text-xl text-md font-bold text-gray-900 mb-2'
      >
        {title}
      </h1>
      <p className='text-sm text-gray-500 mb-4 line-clamp-2'>{desc}</p>
      <div className='flex flex-wrap gap-4'>
        {type.map((item) => (
          <Chips key={item} category={item} />
        ))}
      </div>
    </CardContainer>
  );
};

export default TaskCard;
