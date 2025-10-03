import { ArrowLeft, Trophy, Star, Award, Crown, CheckCircle, Circle } from 'lucide-react';
import { Challenge, Badge } from '../types';
import { leaderboard } from '../data/mockData';

interface ChallengesProps {
  challenges: Challenge[];
  badges: Badge[];
  onNavigate: (page: string) => void;
  onCompleteChallenge: (challengeId: string) => void;
}

export default function Challenges({ challenges, badges, onNavigate, onCompleteChallenge }: ChallengesProps) {
  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');

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
        <h1 className="text-3xl font-bold text-gray-800">Challenges & Rewards</h1>
        <p className="text-gray-600 mt-1">Complete challenges and earn badges</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-800">Daily Challenges</h2>
            </div>
            <div className="space-y-3">
              {dailyChallenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    challenge.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => !challenge.completed && onCompleteChallenge(challenge.id)}
                      className="mt-1 flex-shrink-0"
                      disabled={challenge.completed}
                    >
                      {challenge.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-green-600 transition-colors" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        challenge.completed ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        +{challenge.points} points
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Weekly Challenge</h2>
            </div>
            {weeklyChallenges.map(challenge => (
              <div key={challenge.id} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    +{challenge.points} points
                  </span>
                </div>
                {challenge.progress !== undefined && challenge.maxProgress && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">
                        {challenge.progress} / {challenge.maxProgress} days
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.map(entry => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    entry.rank === 3 ? 'bg-yellow-600 text-yellow-100' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="text-2xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{entry.username}</div>
                    <div className="text-sm text-gray-600">{entry.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Your Badges</h2>
            </div>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-semibold text-gray-800 text-sm">{badge.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Complete challenges to earn badges!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
