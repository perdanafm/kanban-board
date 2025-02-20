import NavigationSidebar from './components/navigation/sidebar';

function App() {
  return (
    <>
      <NavigationSidebar />
      {/* Content */}
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div className='p-4 border-2 border-dashed rounded-lg dark:border-gray-300 h-full'>
          <div className='grid grid-cols-3 gap-4 mb-4 text-gray-500'>
            <p className='text-sm font-semibold'>TO DO</p>
            <p className='text-sm font-semibold'>DOING</p>
            <p className='text-sm font-semibold'>DONE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
