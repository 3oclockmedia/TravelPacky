import { categories } from '../data/categories';
import type { Category } from '../types';

export const getCategoryInfo = (categoryId: string): Category | undefined => {
  return categories.find(c => c.id === categoryId);
};