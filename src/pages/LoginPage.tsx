import LoginForm from '@/components/form/LoginForm';
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
      if (success.user) {
        login(success.user);
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
      <LoginForm form={form} />
    </div>
  );
};

export default LoginPage;
