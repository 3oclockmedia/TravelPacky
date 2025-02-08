import React from 'react';
import { Trip } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faSuitcase } from '@fortawesome/free-solid-svg-icons';

interface Props {
  trips: Trip[];
  onSelectTrip: (tripId: string) => void;
}

export const ExistingTripsList: React.FC<Props> = ({ trips, onSelectTrip }) => {
  if (trips.length === 0) return null;

  return (
    <div className="mt-5">
      <h2 className="h4 mb-4 text-custom">
        <FontAwesomeIcon icon={faSuitcase} className="me-2" />
        Your Trips
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="list-group">
            {trips.map(trip => (
              <button
                key={trip.id}
                className="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex align-items-center justify-content-between"
                onClick={() => onSelectTrip(trip.id)}
              >
                <span>
                  <FontAwesomeIcon icon={faCalendarDays} className="me-2 text-custom" />
                  {trip.name}
                </span>
                <small className="badge bg-primary">
                  {trip.items.length} items
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};