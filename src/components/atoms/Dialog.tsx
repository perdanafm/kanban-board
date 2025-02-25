import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Button from './Button';
import { ReactElement } from 'react';
import { ReactFormExtendedApi } from '@tanstack/react-form';
import SpinnerButton from './SpinnerButton';

interface IDialogWrapper {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactElement;
  onSubmit: () => void;
  labelButton: string;
  form: ReactFormExtendedApi<
    {
      taskName: string;
      description: string;
      category: {
        design: boolean;
        frontend: boolean;
        backend: boolean;
      };
      status: string;
    },
    undefined
  >;
}

const DialogWrapper = ({
  isOpen,
  onClose,
  title,
  content,
  form,
  onSubmit,
  labelButton,
}: IDialogWrapper) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      transition
      className='text-gray-500 text-md transition duration-400 ease-out data-[closed]:opacity-0'
      onClose={onClose}
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30 z-3' />
      <div className='fixed inset-0 flex overflow-y-auto items-center justify-center p-4 z-4'>
        <DialogPanel className='space-y-4 border border-gray-200 rounded-lg bg-white '>
          <DialogTitle className='mb-0 font-medium text-lg text-gray-900 border-b border-gray-200 p-4'>
            {title}
          </DialogTitle>
          <Description className='p-4 mb-0 border-b border-gray-200'>
            {content}
          </Description>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className='flex gap-4 p-4 justify-end'>
                <Button type='secondary' onClick={onClose} label='Cancel' />
                <Button
                  disabled={!canSubmit}
                  purpose='submit'
                  type='primary'
                  onClick={onSubmit}
                  label={isSubmitting ? <SpinnerButton /> : labelButton}
                />
              </div>
            )}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogWrapper;
