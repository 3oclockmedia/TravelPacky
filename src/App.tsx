import React, { useState } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { PackingList } from './components/PackingList';
import { TripHeader } from './components/TripHeader';
import { TripSelector } from './components/TripSelector';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useTrips } from './hooks/useTrips';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const {
    trips,
    currentTrip,
    setCurrentTripId,
    createTrip,
    updateTripItems,
    deleteTrip
  } = useTrips();

  const handleCreateTrip = () => {
    const name = window.prompt('Enter trip name:');
    if (name) {
      createTrip(name);
      setShowWelcome(false);
    }
  };

  const handleSelectTrip = (tripId: string) => {
    setCurrentTripId(tripId);
    setShowWelcome(false);
  };

  const handleUpdateItems = (items: any[]) => {
    if (currentTrip) {
      updateTripItems(currentTrip.id, items);
    }
  };

  const handleClose = () => {
    setShowWelcome(true);
    setCurrentTripId(null);
  };

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onCreateTrip={handleCreateTrip}
        onSelectTrip={handleSelectTrip}
        existingTrips={trips}
      />
    );
  }

  return (
    <div className="container py-4" data-bs-theme="dark">
      <TripSelector
        trips={trips}
        currentTripId={currentTrip?.id || null}
        onSelectTrip={handleSelectTrip}
        onCreateTrip={handleCreateTrip}
        onDeleteTrip={deleteTrip}
        onClose={handleClose}
      />
      
      {currentTrip && (
        <>
          <TripHeader
            tripName={currentTrip.name}
            onTripNameChange={(name) => updateTripItems(currentTrip.id, currentTrip.items)}
            packedCount={currentTrip.items.filter(item => item.packed).length}
            totalCount={currentTrip.items.length}
          />
          
          <PackingList
            items={currentTrip.items}
            onToggle={(id) => {
              const newItems = currentTrip.items.map(item =>
                item.id === id ? { ...item, packed: !item.packed } : item
              );
              handleUpdateItems(newItems);
            }}
            onUpdateQuantity={(id, quantity) => {
              const newItems = currentTrip.items.map(item =>
                item.id === id ? { ...item, quantity } : item
              );
              handleUpdateItems(newItems);
            }}
            onDelete={(id) => {
              const newItems = currentTrip.items.filter(item => item.id !== id);
              handleUpdateItems(newItems);
            }}
          />
          
          <AddItemForm
            onAdd={(name, category, quantity) => {
              const newItem = {
                id: Date.now().toString(),
                name,
                category,
                quantity,
                packed: false
              };
              handleUpdateItems([...currentTrip.items, newItem]);
            }}
          />
        </>
      )}
    </div>
  );
}