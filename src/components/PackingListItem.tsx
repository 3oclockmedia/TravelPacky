import React from 'react';
import { PackingItem } from '../types';
import { getCategoryInfo } from '../utils/categoryUtils';

interface Props {
  item: PackingItem;
  onToggle: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

export const PackingListItem: React.FC<Props> = ({
  item,
  onToggle,
  onUpdateQuantity,
  onDelete
}) => {
  const category = getCategoryInfo(item.category);

  return (
    <div className="row align-items-center mb-2 p-2 border border-secondary rounded bg-dark text-light">
      <div className="col-6 col-md-4">
        {category?.icon} {category?.name}
      </div>
      <div className="col-6 col-md-4">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={item.packed}
            onChange={() => onToggle(item.id)}
            id={`item-${item.id}`}
          />
          <label 
            className={`form-check-label ${item.packed ? 'text-decoration-line-through text-secondary' : ''}`}
            htmlFor={`item-${item.id}`}
          >
            {item.name}
          </label>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
          className="form-control form-control-sm w-auto d-inline-block bg-dark text-light border-secondary"
        />
        <button
          onClick={() => onDelete(item.id)}
          className="btn btn-link text-danger"
        >
          ×
        </button>
      </div>
    </div>
  );
};