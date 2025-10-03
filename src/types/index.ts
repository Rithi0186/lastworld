export interface User {
  id: string;
  username: string;
  ecoScore: number;
  badges: Badge[];
  totalCO2Saved: number;
  totalWasteRecycled: number;
  challengesCompleted: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'transport' | 'food' | 'energy';
  category: string;
  co2Amount: number;
  date: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  points: number;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate?: string;
}

export interface MarketplaceItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'books' | 'electronics' | 'furniture' | 'clothes';
  condition: string;
  type: 'swap' | 'donate' | 'sell';
  image?: string;
  price?: number;
}

export interface WasteItem {
  name: string;
  method: 'Recycle' | 'Compost' | 'E-Waste' | 'Trash';
  description: string;
  fact?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
