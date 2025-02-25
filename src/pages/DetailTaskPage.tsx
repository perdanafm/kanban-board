import Button from '@/components/atoms/Button';
import DialogWrapper from '@/components/atoms/Dialog';
import DetailCard from '@/components/cards/DetailCard';
import AddTaskForm from '@/components/form/AddTaskForm';
import Sidebar from '../components/navigation/sidebar';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useParams } from 'react-router-dom';
import { useDeleteTask, useEditTask, useGetTaskDetail } from '@/services/hooks';
import Spinner from '@/components/atoms/Spinner';
import { useAuth } from '@/context/AuthContext';
import { Tasks } from '@/services/types';

function DetailTaskPage() {
  const [editTask, setOpenEditTask] = useState(false);
  const [deleteTask, setOpenDeleteTask] = useState(false);
  const { slug } = useParams();
  const { user } = useAuth();

  const { data, isLoading, isFetching } = useGetTaskDetail(
    slug?.toString() ?? ''
  );
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

  const editTaskAction = useEditTask(_handleCloseEditTask);
  const deleteTaskAction = useDeleteTask(_handleCloseDeleteTask);

  const form = useForm({
    defaultValues: {
      taskName: data?.title ?? '',
      description: data?.description ?? '',
      category: {
        design: data?.type.includes('design' as 'Design') ?? false,
        frontend: data?.type.includes('frontend' as 'Frontend') ?? false,
        backend: data?.type.includes('backend' as 'Backend') ?? false,
      },
      status: 'todo',
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.taskName,
        type: Object.entries(value.category)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, val]) => val)
          .map(([key]) => key),
        id: data?.id,
        userId: user.id,
        ...value,
      };
      delete (payload as { category?: unknown }).category;
      delete (payload as { taskName?: string }).taskName;
      editTaskAction.mutate(payload as Tasks);
    },
  });

  return (
    <main>
      <DialogWrapper
        isOpen={editTask}
        onClose={_handleCloseEditTask}
        onSubmit={form.handleSubmit}
        labelButton='Save'
        title='Edit a Task'
        form={form}
        content={<AddTaskForm form={form} />}
      />
      <DialogWrapper
        isOpen={deleteTask}
        onClose={_handleCloseDeleteTask}
        onSubmit={() => deleteTaskAction.mutate(data?.id.toString() ?? '')}
        labelButton='Yes, Delete'
        form={form}
        title='Delete Task'
        content={<p>Are you sure want to delete this task?</p>}
      />

      <Sidebar />
      {/* Content */}
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div id='header-title-button' className='p-4 mt-4 flex justify-between'>
          <h1 className='font-semibold text-3xl text-gray-900'>Task Detail</h1>
        </div>
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <div className='p-4 h-full text-gray-500 space-y-4'>
            <p className='font-semibold'>Dashboard &gt; Detail Task</p>

            <DetailCard data={data} />
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
        )}
      </div>
    </main>
  );
}

export default DetailTaskPage;
