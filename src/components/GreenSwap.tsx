import { useState } from 'react';
import { ArrowLeft, Upload, Package, TrendingUp, Filter } from 'lucide-react';
import { MarketplaceItem } from '../types';

interface GreenSwapProps {
  items: MarketplaceItem[];
  onNavigate: (page: string) => void;
  onAddItem: (item: Omit<MarketplaceItem, 'id' | 'userId'>) => void;
}

export default function GreenSwap({ items, onNavigate, onAddItem }: GreenSwapProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'books' | 'electronics' | 'furniture' | 'clothes'>('books');
  const [condition, setCondition] = useState('');
  const [type, setType] = useState<'swap' | 'donate' | 'sell'>('swap');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !condition) return;

    onAddItem({
      title,
      description,
      category,
      condition,
      type,
      price: type === 'sell' ? parseFloat(price) : undefined
    });

    setTitle('');
    setDescription('');
    setCondition('');
    setPrice('');
    setShowUploadForm(false);
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);
  const totalImpact = 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">GreenSwap</h1>
          <p className="text-gray-600 mt-1">Community marketplace for sustainable living</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center"
        >
          <Upload className="w-5 h-5 mr-2" />
          List Item
        </button>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8" />
          <div className="text-center">
            <div className="text-3xl font-bold">{totalImpact}kg</div>
            <div className="text-sm">Waste saved this month by swapping!</div>
          </div>
        </div>
      </div>

      {showUploadForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">List Your Item</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Vintage Bookshelf"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your item..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="books">Books</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothes">Clothes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g., Good"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="swap">Swap</option>
                  <option value="donate">Donate</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              {type === 'sell' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="$0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                List Item
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filter by category:</span>
          <div className="flex gap-2">
            {['all', 'books', 'electronics', 'furniture', 'clothes'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <Package className="w-16 h-16 text-green-600" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.type === 'swap' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'donate' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Condition: <span className="font-medium text-gray-700">{item.condition}</span></span>
                {item.price && (
                  <span className="text-green-600 font-semibold text-lg">${item.price}</span>
                )}
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No items found in this category</p>
        </div>
      )}
    </div>
  );
}
