'use client';

import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: 'N', description: 'Create new todo' },
    { key: 'K', description: 'Toggle Kanban view' },
    { key: 'A', description: 'Show analytics' },
    { key: 'E', description: 'Import/Export' },
    { key: 'F', description: 'Focus search' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'ESC', description: 'Close modals' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Keyboard size={24} />
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
              <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded font-mono text-sm font-semibold text-gray-900 dark:text-white shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Hold <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl</kbd> or{' '}
          <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Cmd</kbd> for most shortcuts
        </p>
      </div>
    </div>
  );
}

