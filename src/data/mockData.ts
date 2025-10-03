import { User, Challenge, Badge, MarketplaceItem, WasteItem, NewsArticle, QuizQuestion, Activity } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'EcoWarrior',
  ecoScore: 78,
  badges: [],
  totalCO2Saved: 24.5,
  totalWasteRecycled: 18.2,
  challengesCompleted: 12
};

export const mockBadges: Badge[] = [
  { id: '1', name: 'Plastic-Free Hero', icon: '🌿', description: 'Avoided plastic for 30 days' },
  { id: '2', name: 'Recycler', icon: '♻️', description: 'Recycled 50kg of waste' },
  { id: '3', name: 'Carbon Neutral', icon: '🌍', description: 'Reduced 100kg CO₂' },
  { id: '4', name: 'Green Commuter', icon: '🚲', description: 'Used eco-friendly transport for 20 days' }
];

export const mockChallenges: Challenge[] = [
  { id: '1', title: 'Bring your own bag', description: 'Use a reusable bag for shopping', type: 'daily', points: 10, completed: false },
  { id: '2', title: 'Use public transport', description: 'Take bus or train today', type: 'daily', points: 15, completed: false },
  { id: '3', title: 'Meatless Monday', description: 'Have a vegetarian day', type: 'daily', points: 20, completed: false },
  { id: '4', title: 'Zero Waste Week', description: 'Produce minimal waste for 7 days', type: 'weekly', points: 100, completed: false, progress: 3, maxProgress: 7 }
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  { id: '1', userId: '2', title: 'Vintage Bookshelf', description: 'Solid wood bookshelf in great condition', category: 'furniture', condition: 'Good', type: 'swap' },
  { id: '2', userId: '3', title: 'iPhone 12', description: 'Works perfectly, minor scratches', category: 'electronics', condition: 'Good', type: 'sell', price: 450 },
  { id: '3', userId: '4', title: 'Organic Chemistry Textbook', description: '5th edition, barely used', category: 'books', condition: 'Like New', type: 'swap' },
  { id: '4', userId: '5', title: 'Winter Jacket', description: 'Size M, warm and comfortable', category: 'clothes', condition: 'Good', type: 'donate' }
];

export const wasteDatabase: Record<string, WasteItem> = {
  'plastic bottle': { name: 'Plastic Bottle', method: 'Recycle', description: 'Remove cap and rinse before recycling', fact: 'Plastic takes 450 years to decompose' },
  'banana peel': { name: 'Banana Peel', method: 'Compost', description: 'Perfect for composting', fact: 'Composting reduces methane emissions by 20%' },
  'old phone': { name: 'Old Phone', method: 'E-Waste', description: 'Take to e-waste collection center', fact: 'E-waste contains valuable metals that can be recovered' },
  'battery': { name: 'Battery', method: 'E-Waste', description: 'Never throw in regular trash', fact: 'Batteries contain toxic chemicals harmful to soil' },
  'paper': { name: 'Paper', method: 'Recycle', description: 'Keep it clean and dry', fact: 'Recycling 1 ton of paper saves 17 trees' },
  'food scraps': { name: 'Food Scraps', method: 'Compost', description: 'Add to compost bin', fact: 'Food waste makes up 30% of landfill content' },
  'glass bottle': { name: 'Glass Bottle', method: 'Recycle', description: 'Rinse and remove labels', fact: 'Glass can be recycled infinitely' }
};

export const mockNews: NewsArticle[] = [
  { id: '1', title: 'Global Carbon Emissions Drop 5% This Year', excerpt: 'New report shows significant progress in reducing greenhouse gases...', image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-28' },
  { id: '2', title: 'Ocean Cleanup Project Removes 100 Tons of Plastic', excerpt: 'Revolutionary technology successfully cleans Pacific Ocean garbage patch...', image: 'https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-25' },
  { id: '3', title: 'Solar Energy Now Cheaper Than Fossil Fuels', excerpt: 'Renewable energy reaches cost parity milestone worldwide...', image: 'https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-22' }
];

export const mockQuiz: QuizQuestion[] = [
  { id: '1', question: 'How long does plastic take to decompose?', options: ['50 years', '100 years', '450 years', '1000 years'], correctAnswer: 2 },
  { id: '2', question: 'Which transport mode produces least CO₂?', options: ['Car', 'Bus', 'Train', 'Bicycle'], correctAnswer: 3 },
  { id: '3', question: 'What percentage of waste is recyclable?', options: ['25%', '50%', '75%', '90%'], correctAnswer: 2 }
];

export const mockActivities: Activity[] = [
  { id: '1', userId: '1', type: 'transport', category: 'Bicycle', co2Amount: 0, date: '2025-10-01' },
  { id: '2', userId: '1', type: 'transport', category: 'Car', co2Amount: 2.3, date: '2025-10-01' },
  { id: '3', userId: '1', type: 'food', category: 'Vegetarian', co2Amount: 1.5, date: '2025-10-01' },
  { id: '4', userId: '1', type: 'energy', category: 'Electricity', co2Amount: 3.2, date: '2025-09-30' }
];

export const ecoTips = [
  'Use public transport twice a week to save 2kg CO₂',
  'Switching to LED bulbs reduces energy consumption by 75%',
  'Bring reusable bags to save 1500 plastic bags per year',
  'Composting reduces household waste by 30%',
  'Air-drying clothes saves 500kg CO₂ annually',
  'One meatless day per week saves 900kg CO₂ per year'
];

export const leaderboard = [
  { rank: 1, username: 'GreenGuru', points: 2450, avatar: '🌟' },
  { rank: 2, username: 'EcoChampion', points: 2180, avatar: '🏆' },
  { rank: 3, username: 'PlanetSaver', points: 1920, avatar: '🌍' },
  { rank: 4, username: 'EcoWarrior', points: 1650, avatar: '💚' },
  { rank: 5, username: 'NatureGuard', points: 1430, avatar: '🌿' }
];
