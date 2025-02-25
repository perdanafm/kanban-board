const SpinnerButton = () => {
  return (
    <div className='relative text-center justify-self-center'>
      <div className='p-1 bg-gradient-to-tr animate-spin w-fit from-green-500 to-blue-500 via-purple-500 rounded-full'>
        <div className='bg-white/20 rounded-full'>
          <div className='w-3 h-3 rounded-full'></div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerButton;
