import { useAuth } from '@/context/AuthContext';
import { useGetUsers } from '@/services/hooks';
import { Users } from '@/services/types';
import { checkLogin } from '@/utils/tools';
import { useForm } from '@tanstack/react-form';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { refetch } = useGetUsers();
  const { login } = useAuth();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const { data } = await refetch();
        identifierCheck(value, data!);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  const identifierCheck = async (
    value: {
      email: string;
      password: string;
    },
    dataX: Users[]
  ) => {
    if (dataX) {
      const success = checkLogin(value.email, value.password, dataX);
      if (success.success === true) {
        login(success.user!.id.toString());
      } else {
        toast.error('Invalid email or password');
      }
    }
  };

  return (
    <div className='text-gray-900 flex justify-center items-center h-screen'>
      <div className='w-1/2 h-screen hidden lg:block'>
        <img
          src='https://cdn.prod.website-files.com/61afbca2a1ebe4173318aaef/6596bf7a606a0984eb53ef55_What%20is%20a%20kanban%20board.jpg'
          alt='Placeholder Image'
          className='object-cover w-full h-full'
        />
      </div>

      {/* Right: Login Form */}
      <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
        <h1 className='text-2xl te font-semibold mb-4'>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Username Input */}
          <div className='mb-4'>
            <form.Field
              name='email'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'A password is required' : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className='block text-gray-600'>
                      Email
                    </label>
                    <input
                      type='text'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                      autoComplete='off'
                    />
                  </>
                );
              }}
            />
          </div>
          <div className='mb-4'>
            <form.Field
              name='password'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'A password is required' : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className='block text-gray-800'>
                      Password
                    </label>
                    <input
                      type='password'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                      autoComplete='off'
                    />
                  </>
                );
              }}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type='submit'
                disabled={!canSubmit}
                className='cursor-pointer bg-sky-600 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
              >
                {isSubmitting ? 'Loading...' : 'Login'}
              </button>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
