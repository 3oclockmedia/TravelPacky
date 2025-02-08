import React from 'react';
import { PackingItem } from '../types';
import { Category } from '../types';

interface Props {
  category: Category;
  items: PackingItem[];
  onToggle: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

export const CategoryGroup: React.FC<Props> = ({
  category,
  items,
  onToggle,
  onUpdateQuantity,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b">
        <h3 className="text-sm font-medium text-gray-700">
          {category.icon} {category.name}
        </h3>
      </div>
      <div className="divide-y">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onToggle(item.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={item.packed ? 'line-through text-gray-400' : ''}>
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                className="w-16 p-1 border border-gray-300 rounded text-center"
              />
              <button
                onClick={() => onDelete(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};