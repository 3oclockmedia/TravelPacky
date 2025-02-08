export interface PackingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  packed: boolean;
}

export interface Trip {
  id: string;
  name: string;
  items: PackingItem[];
  createdAt: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};