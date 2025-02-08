import { PackingItem } from '../types';

export const groupItemsByCategory = (items: PackingItem[]): Record<string, PackingItem[]> => {
  return items.reduce((acc, item) => {
    const category = acc[item.category] || [];
    return { ...acc, [item.category]: [...category, item] };
  }, {} as Record<string, PackingItem[]>);
};