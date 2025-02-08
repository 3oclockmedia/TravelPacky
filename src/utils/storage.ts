import { Trip, PackingItem } from '../types';

const TRIPS_KEY = 'packingListTrips';
const CURRENT_TRIP_ID_KEY = 'currentTripId';

export const saveTrips = (trips: Trip[]): void => {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const loadTrips = (): Trip[] => {
  const stored = localStorage.getItem(TRIPS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCurrentTripId = (tripId: string): void => {
  localStorage.setItem(CURRENT_TRIP_ID_KEY, tripId);
};

export const loadCurrentTripId = (): string | null => {
  return localStorage.getItem(CURRENT_TRIP_ID_KEY);
};