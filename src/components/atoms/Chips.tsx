import { COLORS_CATEGORY } from '@/constants/const';
import { CategoryType } from '@/constants/types';
import { capitalize } from '@/utils/tools';

interface IChips {
  category: CategoryType;
}
const Chips = ({ category = 'Frontend' }: IChips) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const categoryFinal: CategoryType = capitalize(category);
  const bgColor = COLORS_CATEGORY[categoryFinal].bg;
  const textColor = COLORS_CATEGORY[categoryFinal].text;
  return (
    <span
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`p-1 max-w-fit rounded-md text-xs`}
    >
      {capitalize(category)}
    </span>
  );
};

export default Chips;
