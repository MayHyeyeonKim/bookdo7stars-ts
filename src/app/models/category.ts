export interface Category {
  id: number;
  name: string;
  children: Category[];
}

export type CategoryById = Omit<Category, 'children'> & {
  parent_id: number;
  count?: number;
};

export interface ICategory {
  id: number;
  name: string;
  parent_id: number;
}
