import React, { useState } from 'react';
import { categories } from '../data/categories';

interface Props {
  onAdd: (name: string, category: string, quantity: number) => void;
}

export const AddItemForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, category, quantity);
      setName('');
      setQuantity(1);
      setIsExpanded(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="btn btn-outline-primary w-100"
          >
            + Add item
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="card bg-dark text-light border-secondary p-3">
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add item..."
                className="form-control bg-dark text-light border-secondary"
                autoFocus
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select bg-dark text-light border-secondary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary flex-grow-1">
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};