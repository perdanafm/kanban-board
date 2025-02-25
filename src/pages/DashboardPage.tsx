import Button from '@/components/atoms/Button';
import DialogWrapper from '@/components/atoms/Dialog';
import ColumnCard from '@/components/cards/ColumnCard';
import TaskCard from '@/components/cards/TaskCard';
import AddTaskForm from '@/components/form/AddTaskForm';
import Sidebar from '../components/navigation/sidebar';
import { useState } from 'react';
import { useAddTask, useGetTasks } from '@/services/hooks';
import Spinner from '@/components/atoms/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@tanstack/react-form';

function DashboardPage() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const { user } = useAuth();
  const { data, isLoading, isFetching } = useGetTasks(user.id.toString());

  const _handleCloseAddTask = () => {
    setOpenAddTask(false);
  };
  const _handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const addTask = useAddTask(_handleCloseAddTask);

  const form = useForm({
    defaultValues: {
      taskName: '',
      description: '',
      category: {
        design: false,
        frontend: false,
        backend: false,
      },
      status: 'todo',
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.taskName,
        userId: user.id,
        type: Object.entries(value.category)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, val]) => val)
          .map(([key]) => key),
        ...value,
      };
      delete (payload as { category?: unknown }).category;
      delete (payload as { taskName?: string }).taskName;

      addTask.mutate(payload);
      form.reset();
    },
  });

  const _handleSubmitTask = () => {
    form.handleSubmit();
  };

  return (
    <main>
      <Sidebar />
      <DialogWrapper
        isOpen={openAddTask}
        onClose={_handleCloseAddTask}
        onSubmit={_handleSubmitTask}
        form={form}
        labelButton='Submit'
        title='Add a Task'
        content={<AddTaskForm form={form} />}
      />
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div
          id='header-title-button'
          className='p-4 mt-4 flex flex-wrap gap-4 justify-between'
        >
          <h1 className='font-semibold text-3xl text-gray-900'>
            Hello {user.name}!, Here's your tasks!
          </h1>
          <Button
            type='primary'
            onClick={_handleOpenAddTask}
            label='Add a task'
          />
        </div>
        {isLoading || isFetching ? (
          <div className='w-full h-full text-center mt-20'>
            <Spinner />
          </div>
        ) : (
          <div className='p-4 h-full'>
            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 mb-4 text-gray-500'>
              <ColumnCard title='TO DO'>
                <div className='flex flex-col gap-4'>
                  {data
                    ?.filter((item) => item.status === 'todo')
                    .map((val) => (
                      <TaskCard
                        key={val.title}
                        id={val.id}
                        title={val.title}
                        desc={val.description}
                        type={val.type}
                      />
                    ))}
                </div>
              </ColumnCard>
              <ColumnCard title='DOING'>
                <div className='flex flex-col gap-4'>
                  {data
                    ?.filter((item) => item.status === 'doing')
                    .map((val) => (
                      <TaskCard
                        key={val.title}
                        id={val.id}
                        title={val.title}
                        desc={val.description}
                        type={val.type}
                      />
                    ))}
                </div>
              </ColumnCard>
              <ColumnCard title='DONE'>
                <div className='flex flex-col gap-4'>
                  {data
                    ?.filter((item) => item.status === 'done')
                    .map((val) => (
                      <TaskCard
                        key={val.title}
                        id={val.id}
                        title={val.title}
                        desc={val.description}
                        type={val.type}
                      />
                    ))}
                </div>
              </ColumnCard>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
