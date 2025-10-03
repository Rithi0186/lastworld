import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EcoTrack from './components/EcoTrack';
import WasteWise from './components/WasteWise';
import GreenSwap from './components/GreenSwap';
import Challenges from './components/Challenges';
import Education from './components/Education';
import Profile from './components/Profile';
import { User, Activity, Challenge, Badge, MarketplaceItem } from './types';
import { mockUser, mockActivities, mockChallenges, mockBadges, mockMarketplaceItems, mockNews, mockQuiz } from './data/mockData';

type Page = 'dashboard' | 'ecotrack' | 'wastewise' | 'greenswap' | 'challenges' | 'education' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [user, setUser] = useState<User>(mockUser);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(mockMarketplaceItems);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleAddActivity = (activity: Omit<Activity, 'id' | 'userId'>) => {
    const newActivity: Activity = {
      ...activity,
      id: String(activities.length + 1),
      userId: user.id
    };
    setActivities([newActivity, ...activities]);

    const co2Saved = activity.co2Amount === 0 ? 0.5 : 0;
    setUser({
      ...user,
      totalCO2Saved: parseFloat((user.totalCO2Saved + co2Saved).toFixed(2)),
      ecoScore: Math.min(100, user.ecoScore + 1)
    });
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(challenges.map(c =>
      c.id === challengeId ? { ...c, completed: true } : c
    ));

    setUser({
      ...user,
      challengesCompleted: user.challengesCompleted + 1,
      ecoScore: Math.min(100, user.ecoScore + 2)
    });

    if (user.challengesCompleted + 1 === 5 && badges.length === 0) {
      setBadges([mockBadges[0]]);
    }
  };

  const handleAddMarketplaceItem = (item: Omit<MarketplaceItem, 'id' | 'userId'>) => {
    const newItem: MarketplaceItem = {
      ...item,
      id: String(marketplaceItems.length + 1),
      userId: user.id
    };
    setMarketplaceItems([newItem, ...marketplaceItems]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'dashboard' && (
        <Dashboard user={user} onNavigate={handleNavigate} />
      )}

      {currentPage === 'ecotrack' && (
        <EcoTrack
          activities={activities}
          onNavigate={handleNavigate}
          onAddActivity={handleAddActivity}
        />
      )}

      {currentPage === 'wastewise' && (
        <WasteWise onNavigate={handleNavigate} />
      )}

      {currentPage === 'greenswap' && (
        <GreenSwap
          items={marketplaceItems}
          onNavigate={handleNavigate}
          onAddItem={handleAddMarketplaceItem}
        />
      )}

      {currentPage === 'challenges' && (
        <Challenges
          challenges={challenges}
          badges={badges}
          onNavigate={handleNavigate}
          onCompleteChallenge={handleCompleteChallenge}
        />
      )}

      {currentPage === 'education' && (
        <Education
          news={mockNews}
          quiz={mockQuiz}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'profile' && (
        <Profile
          user={user}
          badges={badges}
          activities={activities}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
