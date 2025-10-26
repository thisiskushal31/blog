import React from 'react';
import { Home } from 'lucide-react';

interface FloatingActionButtonsProps {
  showNavbar: boolean;
  onToggleNavbar: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  showNavbar,
  onToggleNavbar
}) => {
  const handleGoHome = () => {
    window.location.href = '/blog/#/blog';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Home Button - Teal */}
      <button
        onClick={handleGoHome}
        className="w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-teal-500"
        title="Go to Home"
      >
        <Home className="w-5 h-5" />
      </button>

      {/* Navbar Toggle Button (only show when navbar is hidden) - Dark gray */}
      {!showNavbar && (
        <button
          onClick={onToggleNavbar}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-gray-600"
          title="Show Navigation"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default FloatingActionButtons;
