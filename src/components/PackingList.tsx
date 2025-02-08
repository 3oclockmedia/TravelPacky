import React from 'react';
import { PackingItem } from '../types';
import { PackingListItem } from './PackingListItem';
import { groupItemsByCategory } from '../utils/itemUtils';

interface Props {
  items: PackingItem[];
  onToggle: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

export const PackingList: React.FC<Props> = ({ 
  items, 
  onToggle, 
  onUpdateQuantity, 
  onDelete 
}) => {
  const groupedItems = groupItemsByCategory(items);

  return (
    <div className="mb-5">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="mb-4">
          {categoryItems.map((item) => (
            <PackingListItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onUpdateQuantity={onUpdateQuantity}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
};