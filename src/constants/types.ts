export type CategoryType = 'Frontend' | 'Backend' | 'Design';

type ColorSchemeType = {
  bg: string;
  text: string;
};

export type ColorsCategoryType = Record<CategoryType, ColorSchemeType>;

export type StatusType = 'todo' | 'doing' | 'done';
export type StatusSchemeType = {
  label: string;
  value: string;
};
