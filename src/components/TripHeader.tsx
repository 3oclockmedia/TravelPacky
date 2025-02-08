import React, { useState } from 'react';

interface Props {
  tripName: string;
  onTripNameChange: (name: string) => void;
  packedCount: number;
  totalCount: number;
}

export const TripHeader: React.FC<Props> = ({ 
  tripName, 
  onTripNameChange, 
  packedCount, 
  totalCount 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tripName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTripNameChange(editValue);
    setIsEditing(false);
  };

  return (
    <div className="row text-center mb-4">
      <div className="col-md-8">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="form-control form-control-lg"
              autoFocus
              onBlur={handleSubmit}
              placeholder="Enter trip name"
            />
          </form>
        ) : (
          <h1 
            className="display-6 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {tripName || 'Name your trip'}
          </h1>
        )}
      </div>
      <div className="col-6 col-md-4">
        <div className="badge bg-primary p-2">
          {packedCount} / {totalCount}
        </div>
        <div className="text-muted small mt-1">
          Items packed
        </div>
      </div>
    </div>
  );
};