import React from 'react';
import { Trip } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface Props {
  trips: Trip[];
  currentTripId: string | null;
  onSelectTrip: (tripId: string) => void;
  onCreateTrip: () => void;
  onDeleteTrip: (tripId: string) => void;
  onClose: () => void;
}

export const TripSelector: React.FC<Props> = ({
  trips,
  currentTripId,
  onSelectTrip,
  onCreateTrip,
  onDeleteTrip,
  onClose
}) => {
  return (
    <div className="mb-4">
      <div className="d-flex gap-2 align-items-center">
        <select
          className="form-select"
          value={currentTripId || ''}
          onChange={(e) => onSelectTrip(e.target.value)}
        >
          <option value="" disabled>Select a trip</option>
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>
              {trip.name}
            </option>
          ))}
        </select>
        <button 
          className="btn btn-primary" 
          onClick={onCreateTrip}
        >
          New Trip
        </button>
        {currentTripId && (
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this trip?')) {
                onDeleteTrip(currentTripId);
              }
            }}
          >
            Delete Trip
          </button>
        )}
        <button
          className="btn btn-outline-secondary ms-auto"
          onClick={onClose}
          title="Return to Welcome Screen"
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
      </div>
    </div>
  );
};