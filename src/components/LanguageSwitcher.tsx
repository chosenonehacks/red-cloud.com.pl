import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en'
            ? 'bg-red-600 text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('pl')}
        className={`px-2 py-1 rounded ${
          language === 'pl'
            ? 'bg-red-600 text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        PL
      </button>
    </div>
  );
}