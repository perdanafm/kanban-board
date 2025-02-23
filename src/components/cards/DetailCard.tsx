import CardContainer from '../atoms/CardContainer';
import Chips from '../atoms/Chips';

const DetailCard = () => {
  return (
    <CardContainer className='flex flex-col gap-4'>
      <p className='text-3xl text-gray-900 font-bold'>Design User Interface</p>
      <div className='flex flex-row space-y-2 flex-wrap w-full'>
        <p id='desc-detail' className='font-medium md:w-3/4 w-4/4 text-left'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className='md:w-1/4 w-4/4'>
          <p className='font-semibold'>Info</p>
          <p className=''>Created at: 24 February 2024</p>
          <p className=''>Updated at: 28 February 2024</p>
        </div>
      </div>
      <Chips category='Design' />
      <div id='status'>
        <p className='font-medium'>
          Status : <span>TO DO</span>
        </p>
      </div>
    </CardContainer>
  );
};

export default DetailCard;
