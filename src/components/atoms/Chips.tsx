import { COLORS_CATEGORY } from '@/constants/const';
import { CategoryType } from '@/constants/types';

interface IChips {
  category: CategoryType;
}
const Chips = ({ category = 'Frontend' }: IChips) => {
  const bgColor = COLORS_CATEGORY[category].bg;
  const textColor = COLORS_CATEGORY[category].text;
  console.log(bgColor);
  return (
    <span
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`p-1 max-w-fit rounded-md text-xs`}
    >
      {category}
    </span>
  );
};

export default Chips;
