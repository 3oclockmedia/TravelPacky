import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { ExistingTripsList } from './ExistingTripsList';
import { Trip } from '../types';

interface Props {
  onCreateTrip: () => void;
  onSelectTrip: (tripId: string) => void;
  existingTrips: Trip[];
}

export const WelcomeScreen: React.FC<Props> = ({ 
  onCreateTrip, 
  onSelectTrip,
  existingTrips 
}) => {
  return (
    <div className="container py-4 text-center">
      <h1 className="display-4 mb-4 text-custom">Travel Packy</h1>
      <p className="text-custom mb-4">by Boarding Better</p>
      <div className="mb-5">
        <FontAwesomeIcon 
          icon={faSuitcase} 
          className="text-custom"
          style={{ fontSize: 'min(200px, 40vw)' }}
        />
      </div>
      <div className="mb-5">
        <button 
          className="btn btn-lg btn-custom-primary"
          onClick={onCreateTrip}
        >
          Create New Trip
        </button>
      </div>
      
      <ExistingTripsList 
        trips={existingTrips} 
        onSelectTrip={onSelectTrip}
      />
    </div>
  );
};