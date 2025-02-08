import { useState, useEffect } from 'react';
import { Trip, PackingItem } from '../types';
import { saveTrips, loadTrips, saveCurrentTripId, loadCurrentTripId } from '../utils/storage';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);

  // Load trips from localStorage on initial render
  useEffect(() => {
    setTrips(loadTrips());
    setCurrentTripId(loadCurrentTripId());
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  // Save current trip ID whenever it changes
  useEffect(() => {
    if (currentTripId) {
      saveCurrentTripId(currentTripId);
    }
  }, [currentTripId]);

  const currentTrip = currentTripId 
    ? trips.find(trip => trip.id === currentTripId)
    : null;

  const createTrip = (name: string) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      name,
      items: [],
      createdAt: new Date().toISOString()
    };
    setTrips([...trips, newTrip]);
    setCurrentTripId(newTrip.id);
  };

  const updateTripItems = (tripId: string, items: PackingItem[]) => {
    setTrips(trips.map(trip =>
      trip.id === tripId ? { ...trip, items } : trip
    ));
  };

  const deleteTrip = (tripId: string) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
    if (currentTripId === tripId) {
      const remainingTrips = trips.filter(trip => trip.id !== tripId);
      setCurrentTripId(remainingTrips.length > 0 ? remainingTrips[0].id : null);
    }
  };

  return {
    trips,
    currentTrip,
    setCurrentTripId,
    createTrip,
    updateTripItems,
    deleteTrip
  };
}