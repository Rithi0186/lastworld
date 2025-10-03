import { useState } from 'react';
import { Activity } from '../types';
import { ArrowLeft, Plus, TrendingDown, Car, Utensils, Zap } from 'lucide-react';

interface EcoTrackProps {
  activities: Activity[];
  onNavigate: (page: string) => void;
  onAddActivity: (activity: Omit<Activity, 'id' | 'userId'>) => void;
}

export default function EcoTrack({ activities, onNavigate, onAddActivity }: EcoTrackProps) {
  const [activityType, setActivityType] = useState<'transport' | 'food' | 'energy'>('transport');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const transportOptions = ['Car', 'Bus', 'Train', 'Walk', 'Bicycle'];
  const foodOptions = ['Vegetarian', 'Non-Vegetarian', 'Fast Food', 'Vegan'];
  const energyOptions = ['Electricity', 'Gas', 'Heating'];

  const co2Rates: Record<string, number> = {
    'Car': 0.21,
    'Bus': 0.05,
    'Train': 0.04,
    'Walk': 0,
    'Bicycle': 0,
    'Vegetarian': 1.5,
    'Non-Vegetarian': 3.3,
    'Fast Food': 4.5,
    'Vegan': 1.0,
    'Electricity': 0.4,
    'Gas': 2.0,
    'Heating': 1.5
  };

  const handleAddActivity = () => {
    if (!category) return;

    const co2Amount = co2Rates[category] * (amount ? parseFloat(amount) : 1);

    onAddActivity({
      type: activityType,
      category,
      co2Amount: parseFloat(co2Amount.toFixed(2)),
      date: new Date().toISOString().split('T')[0]
    });

    setCategory('');
    setAmount('');
  };

  const totalCO2Today = activities
    .filter(a => a.date === new Date().toISOString().split('T')[0])
    .reduce((sum, a) => sum + a.co2Amount, 0);

  const averageCO2 = 15.5;

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const dayActivities = activities.filter(a => a.date === dateStr);
    return {
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      value: dayActivities.reduce((sum, a) => sum + a.co2Amount, 0)
    };
  });

  const maxValue = Math.max(...weeklyData.map(d => d.value), 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Carbon Footprint</h1>
        <p className="text-gray-600 mt-1">Track and reduce your environmental impact</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Activity</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActivityType('transport')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activityType === 'transport'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Car className="w-6 h-6 mx-auto mb-1 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Transport</span>
                </button>
                <button
                  onClick={() => setActivityType('food')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activityType === 'food'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Utensils className="w-6 h-6 mx-auto mb-1 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Food</span>
                </button>
                <button
                  onClick={() => setActivityType('energy')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activityType === 'energy'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Zap className="w-6 h-6 mx-auto mb-1 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Energy</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select {activityType}</option>
                {activityType === 'transport' && transportOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                {activityType === 'food' && foodOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                {activityType === 'energy' && energyOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {activityType !== 'food' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activityType === 'transport' ? 'Distance (km)' : 'Usage (kWh)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            <button
              onClick={handleAddActivity}
              disabled={!category}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Activity
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Impact</h2>

          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-green-600">{totalCO2Today.toFixed(1)}kg</div>
            <div className="text-sm text-gray-600 mt-1">CO₂ emissions today</div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">Average daily footprint</span>
              <span className="text-lg font-semibold text-blue-900">{averageCO2}kg</span>
            </div>
          </div>

          {totalCO2Today < averageCO2 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <TrendingDown className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-green-800">Great job!</div>
                <div className="text-sm text-green-700 mt-1">
                  You're {(averageCO2 - totalCO2Today).toFixed(1)}kg below average today
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Weekly Overview</h2>

        <div className="flex items-end justify-between h-64 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(day.value / maxValue) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {day.value.toFixed(1)}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 mt-2">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Personalized Tip</h3>
        <p>Switching to cycling for 5km daily commutes saves 0.8kg CO₂ per trip. That's 200kg per year!</p>
      </div>
    </div>
  );
}
