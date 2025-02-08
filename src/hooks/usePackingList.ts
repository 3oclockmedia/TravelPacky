import { useState, useEffect } from 'react';
import { saveItems, loadItems, saveTripName, loadTripName } from '../utils/storage';
import { useSessionPersistence } from './useSessionPersistence';
import type { PackingItem } from '../types';

export function usePackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [tripName, setTripName] = useState(loadTripName());

  // Load items from localStorage on initial render
  useEffect(() => {
    setItems(loadItems());
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    saveItems(items);
  }, [items]);

  // Save trip name whenever it changes
  useEffect(() => {
    saveTripName(tripName);
  }, [tripName]);

  // Enable session persistence
  useSessionPersistence(items, setItems);

  const addItem = (name: string, category: string, quantity: number) => {
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name,
      category,
      quantity,
      packed: false,
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const packedCount = items.filter(item => item.packed).length;
  const totalCount = items.length;

  return {
    items,
    tripName,
    setTripName,
    addItem,
    toggleItem,
    updateQuantity,
    deleteItem,
    packedCount,
    totalCount
  };
}