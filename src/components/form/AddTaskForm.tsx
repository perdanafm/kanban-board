import { STATUS } from '@/constants/const';
import { useForm } from '@tanstack/react-form';

const AddTaskForm = () => {
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
      console.log(value);
    },
  });
  return (
    <form>
      <form.Field
        name='taskName'
        validators={{
          onChange: ({ value }) =>
            !value ? 'Task Name is Required' : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return value.includes('error') && 'No "error" allowed in task name';
          },
        }}
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit'>
              <label htmlFor={field.name} className='text-xs font-bold'>
                Task Name*
              </label>
              <input
                className={`focus:shadow-outline peer mt-2 w-full appearance-none rounded-lg border px-3 py-2 ${
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length &&
                  'border-red-500'
                } focus:outline-none`}
                id={field.name}
                type='text'
                placeholder='Please input task name...'
              />
            </div>
          );
        }}
      />
      <form.Field
        name='description'
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit'>
              <label htmlFor={field.name} className='text-xs font-bold'>
                Description
              </label>
              <textarea
                className={`focus:shadow-outline peer mt-2 w-full appearance-none rounded-lg border px-3 py-2 ${
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length &&
                  'border-red-500'
                } focus:outline-none`}
                id={field.name}
                placeholder='Please input Description'
              />
            </div>
          );
        }}
      />
      <form.Field
        name='category.backend'
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit flex'>
              <input
                type='checkbox'
                name={field.name}
                id={field.name}
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <label
                htmlFor={field.name}
                className='ml-2 block text-sm text-gray-700'
              >
                Backend
              </label>
            </div>
          );
        }}
      />
      <form.Field
        name='category.design'
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit flex'>
              <input
                type='checkbox'
                name={field.name}
                id={field.name}
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <label
                htmlFor={field.name}
                className='ml-2 block text-sm text-gray-700'
              >
                Design
              </label>
            </div>
          );
        }}
      />
      <form.Field
        name='category.frontend'
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit flex'>
              <input
                type='checkbox'
                name={field.name}
                id={field.name}
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <label
                htmlFor={field.name}
                className='ml-2 block text-sm text-gray-700'
              >
                Frontend
              </label>
            </div>
          );
        }}
      />
      <form.Field
        name='status'
        children={(field) => {
          return (
            <div className='mb-2 sm:w-[400px] w-fit'>
              <label htmlFor={field.name} className='text-xs font-bold'>
                Status
              </label>

              <select
                name={field.name}
                id={field.name}
                className='border text-gray-900 text-sm rounded-lg block w-full p-2.5'
              >
                {Object.keys(STATUS).map((item: string) => {
                  return (
                    <option key={item} value={item}>
                      {STATUS[item].label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }}
      />
    </form>
  );
};

export default AddTaskForm;
