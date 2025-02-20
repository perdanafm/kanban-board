import { useNavigate } from 'react-router-dom';
import CardContainer from '../atoms/CardContainer';
import Chips from '../atoms/Chips';

const TaskCard = () => {
  const navigate = useNavigate();
  const handleToDetail = (id: string) => {
    navigate(id);
  };
  return (
    <CardContainer>
      <h1
        onClick={() => handleToDetail('detail')}
        className='overflow-hidden text-clip cursor-pointer hover:underline sm:text-xl text-md font-bold text-gray-900 mb-2'
      >
        Develop Authentication Module
      </h1>
      <p className='text-sm text-gray-500 mb-4 line-clamp-2'>
        Prepare the server environment and database for app development.
      </p>
      <div className='flex flex-wrap gap-4'>
        <Chips category='Backend' />
        <Chips category='Frontend' />
      </div>
    </CardContainer>
  );
};

export default TaskCard;
