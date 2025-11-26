'use client';

import { ColorTheme } from '@/types/todo';
import { Check, Palette } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const themes: { id: ColorTheme; name: string; colors: string[]; }[] = [
  { id: 'default', name: 'Default', colors: ['from-blue-500', 'via-purple-500', 'to-pink-500'] },
  { id: 'ocean', name: 'Ocean', colors: ['from-blue-400', 'via-cyan-400', 'to-teal-400'] },
  { id: 'sunset', name: 'Sunset', colors: ['from-orange-400', 'via-red-400', 'to-pink-400'] },
  { id: 'forest', name: 'Forest', colors: ['from-green-400', 'via-emerald-400', 'to-teal-400'] },
  { id: 'lavender', name: 'Lavender', colors: ['from-purple-400', 'via-pink-400', 'to-rose-400'] },
  { id: 'monochrome', name: 'Monochrome', colors: ['from-gray-400', 'via-gray-500', 'to-gray-600'] },
];

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette size={24} className="text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Colour Theme
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`relative group p-4 rounded-xl border-2 transition-all ${
              currentTheme === theme.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className={`h-16 rounded-lg bg-gradient-to-r ${theme.colors.join(' ')} mb-3 shadow-md`}></div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {theme.name}
              </span>
              {currentTheme === theme.id && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

