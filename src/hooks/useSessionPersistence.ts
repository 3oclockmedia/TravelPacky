import { useEffect } from 'react';
import type { PackingItem } from '../types';

const SESSION_KEY = 'packingListSession';

export function useSessionPersistence(items: PackingItem[], setItems: (items: PackingItem[]) => void) {
  // Load session data on mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (sessionData) {
      setItems(JSON.parse(sessionData));
    }
  }, [setItems]);

  // Save to session storage before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(items));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [items]);
}