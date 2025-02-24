interface IButton {
  type: 'primary' | 'secondary';
  onClick: () => void;
  label: string;
}

const Button = ({ type, label, onClick }: IButton) => {
  const style =
    type === 'primary'
      ? 'bg-sky-600 hover:bg-sky-800 text-white hover:text-gray-200'
      : 'bg-white border hover:bg-gray-100 text-gray-900 hover:text-gray700';
  return (
    <button
      onClick={onClick}
      className={`${style} md:w-fit w-full font-semibold rounded-lg text-sm px-4 py-2 cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default Button;
