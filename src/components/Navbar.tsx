import { Leaf, User } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">last world</span>
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}
