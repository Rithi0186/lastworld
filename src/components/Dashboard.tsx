import { Leaf, Recycle, Trophy, ChevronRight, TreeDeciduous, Droplets, Zap } from 'lucide-react';
import { User } from '../types';
import { ecoTips } from '../data/mockData';
import { useState } from 'react';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % ecoTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + ecoTips.length) % ecoTips.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}!</h1>
        <p className="text-gray-600 mt-1">Let's continue making a difference today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#4CAF50"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - user.ecoScore / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-green-600">{user.ecoScore}</span>
              <span className="text-sm text-gray-600">Eco Score</span>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-700 font-medium">Great progress!</p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <TreeDeciduous className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">{user.totalCO2Saved}kg</div>
            <div className="text-sm text-green-800 mt-1">CO₂ saved this week</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <Recycle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-700">{user.totalWasteRecycled}kg</div>
            <div className="text-sm text-blue-800 mt-1">Waste recycled</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-700">{user.challengesCompleted}</div>
            <div className="text-sm text-yellow-800 mt-1">Challenges completed</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={prevTip}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 transform rotate-180" />
          </button>
          <div className="flex-1 text-center px-4">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="w-5 h-5 mr-2" />
              <span className="font-semibold text-sm uppercase tracking-wide">Eco Tip</span>
            </div>
            <p className="text-lg font-medium">{ecoTips[currentTip]}</p>
          </div>
          <button
            onClick={nextTip}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('ecotrack')}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <TreeDeciduous className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">EcoTrack</h3>
            <p className="text-xs text-gray-600">Track footprint</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('wastewise')}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <Recycle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">WasteWise</h3>
            <p className="text-xs text-gray-600">Disposal guide</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('greenswap')}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <Droplets className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">GreenSwap</h3>
            <p className="text-xs text-gray-600">Marketplace</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('challenges')}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-200 transition-colors">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Challenges</h3>
            <p className="text-xs text-gray-600">Earn rewards</p>
          </div>
        </button>
      </div>
    </div>
  );
}
