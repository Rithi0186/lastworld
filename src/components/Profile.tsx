import { ArrowLeft, User as UserIcon, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { User, Badge, Activity } from '../types';

interface ProfileProps {
  user: User;
  badges: Badge[];
  activities: Activity[];
  onNavigate: (page: string) => void;
}

export default function Profile({ user, badges, activities, onNavigate }: ProfileProps) {
  const recentActivities = activities.slice(0, 10);
  const monthlyImpact = 12;

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
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600 mt-1">Track your environmental impact</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.username}</h2>
          <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            Eco Score: {user.ecoScore}
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-green-600">{badges.length}</div>
              <div className="text-xs text-gray-600">Badges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{user.challengesCompleted}</div>
              <div className="text-xs text-gray-600">Challenges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{activities.length}</div>
              <div className="text-xs text-gray-600">Activities</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Impact Statistics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <div className="text-3xl font-bold text-green-700 mb-1">{user.totalCO2Saved}kg</div>
              <div className="text-sm text-green-800">Total CO₂ Reduced</div>
              <div className="text-xs text-green-700 mt-2">
                Equal to planting {Math.floor(user.totalCO2Saved / 5)} trees
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-1">{user.totalWasteRecycled}kg</div>
              <div className="text-sm text-blue-800">Waste Recycled</div>
              <div className="text-xs text-blue-700 mt-2">
                Prevented landfill pollution
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
              <div className="text-3xl font-bold text-yellow-700 mb-1">{user.challengesCompleted}</div>
              <div className="text-sm text-yellow-800">Challenges Done</div>
              <div className="text-xs text-yellow-700 mt-2">
                Keep up the great work!
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium mb-1">Community Contribution</div>
                <div className="text-2xl font-bold">You helped reduce {monthlyImpact}kg CO₂ this month!</div>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-800">Earned Badges</h2>
          </div>

          {badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{badge.name}</h3>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Award className="w-16 h-16 mx-auto mb-3 text-gray-400" />
              <p>Complete challenges to earn badges!</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Activity History</h2>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800 capitalize">{activity.type}</span>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {activity.category}
                    {activity.co2Amount > 0 && (
                      <span className="ml-2 text-red-600">+{activity.co2Amount}kg CO₂</span>
                    )}
                    {activity.co2Amount === 0 && (
                      <span className="ml-2 text-green-600">Zero emissions!</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recentActivities.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-3 text-gray-400" />
              <p>Start tracking your activities!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
