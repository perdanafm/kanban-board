import { useGetTaskDetail } from '@/services/hooks';
import CardContainer from '../atoms/CardContainer';
import Chips from '../atoms/Chips';
import { useParams } from 'react-router-dom';
import Spinner from '../atoms/Spinner';

const DetailCard = () => {
  const { slug } = useParams();
  const { data, isLoading, isFetching } = useGetTaskDetail(
    slug?.toString() ?? ''
  );

  return isFetching || isLoading ? (
    <Spinner />
  ) : (
    <CardContainer className='flex flex-col gap-4'>
      <p className='text-3xl text-gray-900 font-bold'>{data?.title}</p>
      <div className='flex flex-row space-y-2 flex-wrap w-full'>
        <p id='desc-detail' className='font-medium md:w-3/4 w-4/4 text-left'>
          {data?.description}
        </p>
        <div className='md:w-1/4 w-4/4'>
          <p className='font-semibold'>Info</p>
          <p className=''>Created at: {data?.createdAt}</p>
          <p className=''>Updated at: {data?.updatedAt}</p>
        </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {data?.type.map((item) => (
          <Chips key={item} category={item} />
        ))}
      </div>
      <div id='status'>
        <p className='font-medium'>
          Status : <span>{data?.status}</span>
        </p>
      </div>
    </CardContainer>
  );
};

export default DetailCard;
