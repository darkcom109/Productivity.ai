'use client';

import { useState } from 'react';
import { Plus, Zap, Sparkles, FileText, Clock, Palette, X } from 'lucide-react';

interface QuickActionsMenuProps {
  onNewTodo: () => void;
  onPomodoro: () => void;
  onFocusMode: () => void;
  onTemplates: () => void;
  onThemes: () => void;
}

export default function QuickActionsMenu({
  onNewTodo,
  onPomodoro,
  onFocusMode,
  onTemplates,
  onThemes,
}: QuickActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Plus, label: 'New Task', action: onNewTodo, color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, label: 'Pomodoro', action: onPomodoro, color: 'from-red-500 to-pink-500' },
    { icon: Zap, label: 'Focus Mode', action: onFocusMode, color: 'from-purple-500 to-pink-500' },
    { icon: FileText, label: 'Templates', action: onTemplates, color: 'from-green-500 to-emerald-500' },
    { icon: Palette, label: 'Themes', action: onThemes, color: 'from-orange-500 to-yellow-500' },
  ];

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-3 animate-slide-in">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleAction(action.action)}
                className={`group flex items-center gap-3 bg-white dark:bg-gray-800 hover:shadow-xl transition-all rounded-full pr-5 pl-4 py-3 border border-gray-200 dark:border-gray-700 shadow-lg`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-glow transition-all flex items-center justify-center shadow-2xl ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <Sparkles size={28} className="text-white animate-glow" />
        )}
      </button>
    </div>
  );
}

