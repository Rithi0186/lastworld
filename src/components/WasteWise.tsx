import { useState } from 'react';
import { ArrowLeft, Search, Recycle, Leaf, Trash2, Cpu, MapPin } from 'lucide-react';
import { WasteItem } from '../types';
import { wasteDatabase } from '../data/mockData';

interface WasteWiseProps {
  onNavigate: (page: string) => void;
}

export default function WasteWise({ onNavigate }: WasteWiseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<WasteItem | null>(null);

  const handleSearch = () => {
    const item = wasteDatabase[searchTerm.toLowerCase()];
    setResult(item || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Recycle':
        return <Recycle className="w-8 h-8 text-blue-600" />;
      case 'Compost':
        return <Leaf className="w-8 h-8 text-green-600" />;
      case 'E-Waste':
        return <Cpu className="w-8 h-8 text-yellow-600" />;
      case 'Trash':
        return <Trash2 className="w-8 h-8 text-gray-600" />;
      default:
        return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Recycle':
        return 'bg-blue-50 border-blue-200';
      case 'Compost':
        return 'bg-green-50 border-green-200';
      case 'E-Waste':
        return 'bg-yellow-50 border-yellow-200';
      case 'Trash':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const commonItems = Object.values(wasteDatabase).slice(0, 6);

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
        <h1 className="text-3xl font-bold text-gray-800">WasteWise</h1>
        <p className="text-gray-600 mt-1">Smart waste disposal guide</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an item e.g., plastic bottle"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            Search
          </button>
        </div>

        {result && (
          <div className={`mt-6 border-2 rounded-xl p-6 ${getMethodColor(result.method)}`}>
            <div className="flex items-start gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                {getMethodIcon(result.method)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{result.name}</h3>
                <div className="inline-block px-4 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 mb-3">
                  {result.method}
                </div>
                <p className="text-gray-700 mb-4">{result.description}</p>
                {result.fact && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-start">
                      <Leaf className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-green-800 text-sm mb-1">Did you know?</div>
                        <div className="text-gray-700 text-sm">{result.fact}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {searchTerm && !result && (
          <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800">
              Item not found in our database. Try searching for common items like "plastic bottle", "battery", or "paper".
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Common Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {commonItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchTerm(item.name.toLowerCase());
                setResult(item);
              }}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                {getMethodIcon(item.method)}
                <div>
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.method}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Nearby Recycling Centers</h2>
            <p className="text-gray-600 mb-4">Find recycling facilities near you</p>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Map integration would display here</p>
                <p className="text-sm mt-1">Showing recycling centers in your area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
