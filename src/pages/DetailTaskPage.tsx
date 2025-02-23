import Button from '@/components/atoms/Button';
import DialogWrapper from '@/components/atoms/Dialog';
import DetailCard from '@/components/cards/DetailCard';
import AddTaskForm from '@/components/form/AddTaskForm';
import Sidebar from '../components/navigation/Sidebar';
import { useState } from 'react';

function DetailTaskPage() {
  const [editTask, setOpenEditTask] = useState(false);
  const [deleteTask, setOpenDeleteTask] = useState(false);

  const _handleCloseEditTask = () => {
    setOpenEditTask(false);
  };
  const _handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };
  const _handleOpenEditTask = () => {
    setOpenEditTask(true);
  };
  const _handleOpenDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  const _handleSubmitEdit = () => {
    setOpenEditTask(true);
  };
  const _handleDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  return (
    <main>
      <DialogWrapper
        isOpen={editTask}
        onClose={_handleCloseEditTask}
        onSubmit={_handleSubmitEdit}
        labelButton='Save'
        title='Edit a Task'
        content={<AddTaskForm />}
      />
      <DialogWrapper
        isOpen={deleteTask}
        onClose={_handleCloseDeleteTask}
        onSubmit={_handleDeleteTask}
        labelButton='Yes, Delete'
        title='Delete Task'
        content={<p>Are you sure want to delete this task?</p>}
      />

      <Sidebar />
      {/* Content */}
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div id='header-title-button' className='p-4 mt-4 flex justify-between'>
          <h1 className='font-semibold text-3xl text-gray-900'>Task Detail</h1>
        </div>
        <div className='p-4 h-full text-gray-500 space-y-4'>
          <p className='font-semibold'>Dashboard &gt; Design User Interface</p>

          <DetailCard />
          <div className='w-full items-center justify-end flex flex-row gap-2'>
            <Button
              type='primary'
              label='Edit Task'
              onClick={_handleOpenEditTask}
            />
            <p>or</p>
            <p
              onClick={_handleOpenDeleteTask}
              className='text-rose-500 hover:text-rose-600 cursor-pointer'
            >
              Delete
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailTaskPage;
