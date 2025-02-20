import Button from '@/components/atoms/Button';
import DialogWrapper from '@/components/atoms/Dialog';
import TaskCard from '@/components/cards/TaskCard';
import AddTaskForm from '@/components/form/AddTaskForm';
import NavigationSidebar from '@/components/navigation/Sidebar';
import { useState } from 'react';

function DashboardPage() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const _handleCloseAddTask = () => {
    setOpenAddTask(false);
  };
  const _handleOpenAddTask = () => {
    setOpenAddTask(true);
  };
  const _handleSubmitTask = () => {
    setOpenAddTask(true);
  };

  return (
    <main>
      <NavigationSidebar />
      {/* Content */}
      <DialogWrapper
        isOpen={openAddTask}
        onClose={_handleCloseAddTask}
        onSubmit={_handleSubmitTask}
        labelButton='Submit'
        title='Add a Task'
        content={<AddTaskForm />}
      />
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div
          id='header-title-button'
          className='p-4 mt-4 flex flex-wrap gap-4 justify-between'
        >
          <h1 className='font-semibold text-3xl text-gray-900'>
            Hello Abdul!, Here's your tasks!
          </h1>
          <Button
            type='primary'
            onClick={_handleOpenAddTask}
            label='Add a task'
          />
        </div>
        {/* <div className='p-4 border-2 border-dashed rounded-lg dark:border-gray-300 h-full'> */}
        <div className='p-4 h-full'>
          <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 mb-4 text-gray-500'>
            <div className='relative space-y-6 '>
              <p className='text-sm font-semibold'>TO DO</p>
              <div className='flex flex-col gap-4'>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
              </div>
            </div>
            <div className='relative space-y-6'>
              <p className='text-sm font-semibold'>DOING</p>
              <div className='flex flex-col gap-4'>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
              </div>
            </div>
            <div className='relative space-y-6'>
              <p className='text-sm font-semibold'>DONE</p>
              <div className='flex flex-col gap-4'>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
