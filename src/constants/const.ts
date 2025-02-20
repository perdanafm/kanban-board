import { ColorsCategoryType, StatusSchemeType } from './types';

export const COLORS_CATEGORY: ColorsCategoryType = {
  Frontend: {
    bg: '#e5dfff',
    text: '#9748ff',
  },
  Backend: {
    bg: '#d1fadf',
    text: '#14b066',
  },
  Design: {
    bg: '#f3f4f7',
    text: '#485367',
  },
};

export const STATUS: Record<string, StatusSchemeType> = {
  todo: {
    label: 'TO DO',
    value: 'todo',
  },
  doing: {
    label: 'DOING',
    value: 'doing',
  },
  done: {
    label: 'DONE',
    value: 'done',
  },
};
