'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { X, CheckCircle2, Clock, Target, Sparkles } from 'lucide-react';
import { formatDueDate, getDueDateColor } from '@/utils/helpers';

interface FocusModeProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onClose: () => void;
  onStartTimer: (id: string) => void;
}

export default function FocusMode({ todos, onToggle, onClose, onStartTimer }: FocusModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTodos = todos.filter(t => !t.completed && !t.archived);
  const currentTodo = activeTodos[currentIndex];

  const handleNext = () => {
    if (currentIndex < activeTodos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    if (currentTodo) {
      onToggle(currentTodo.id);
      if (currentIndex < activeTodos.length - 1) {
        // Stay on same index (next todo will shift into position)
      } else if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  if (!currentTodo) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-y-auto flex items-center justify-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-3xl w-full border border-white/20 relative flex flex-col max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            <X size={24} />
          </button>
          
          <Sparkles size={64} className="mx-auto mb-6 text-white" />
          <h2 className="text-4xl font-bold text-white mb-4">
            All Done! 🎉
          </h2>
          <p className="text-xl text-white/80 mb-8">
            You've completed all your active tasks. Time to celebrate or add new goals!
          </p>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-white/90 transition-all shadow-xl font-semibold"
          >
            Exit Focus Mode
          </button>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(t => t.completed && !t.archived).length;
  const totalCount = todos.filter(t => !t.archived).length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-y-auto flex justify-center z-50 p-4 animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl transition-all text-white border border-white/20 z-10"
      >
        <X size={24} />
      </button>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="text-white text-sm mb-2">Progress</div>
        <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-white text-xs mt-2">
          {completedCount} of {totalCount} tasks done
        </div>
      </div>

      {/* Task counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
        <div className="text-white font-semibold">
          Task {currentIndex + 1} of {activeTodos.length}
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-3xl w-full p-12 border border-white/20 relative">
        <div className="overflow-y-auto p-12 space-y-8 flex-1 max-h-[90vh]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-t-3xl"></div>
        
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                currentTodo.priority === 'urgent' ? 'bg-red-500' :
                currentTodo.priority === 'high' ? 'bg-orange-500' :
                currentTodo.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              } text-white shadow-lg`}>
                {currentTodo.priority.toUpperCase()}
              </div>
              <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                {currentTodo.category}
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          {currentTodo.title}
        </h1>

        {currentTodo.description && (
          <p className="text-2xl text-white/80 mb-8 leading-relaxed">
            {currentTodo.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mb-8">
          {currentTodo.dueDate && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <Clock size={20} className="text-white" />
              <span className={`text-white font-medium ${getDueDateColor(currentTodo.dueDate).replace('dark:', '')}`}>
                {formatDueDate(currentTodo.dueDate)}
              </span>
            </div>
          )}
          
          {currentTodo.subtasks.length > 0 && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <Target size={20} className="text-white" />
              <span className="text-white font-medium">
                {currentTodo.subtasks.filter(st => st.completed).length}/{currentTodo.subtasks.length} subtasks
              </span>
            </div>
          )}

          {currentTodo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentTodo.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subtasks */}
        {currentTodo.subtasks.length > 0 && (
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-h-56 overflow-y-auto space-y-3 pr-2">
            <h3 className="text-xl font-semibold text-white mb-4">Subtasks</h3>
            <div className="space-y-3">
              {currentTodo.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 text-white"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    subtask.completed 
                      ? 'bg-white border-white' 
                      : 'border-white/40'
                  }`}>
                    {subtask.completed && <CheckCircle2 size={16} className="text-purple-600" />}
                  </div>
                  <span className={subtask.completed ? 'line-through opacity-60' : ''}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleComplete}
            className="flex-1 py-4 bg-white text-purple-600 rounded-2xl hover:bg-white/90 transition-all shadow-xl font-bold text-lg flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={24} />
            Complete Task
          </button>
          
          <button
            onClick={() => onStartTimer(currentTodo.id)}
            className="px-6 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-2xl transition-all border border-white/30 font-semibold"
          >
            <Clock size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 text-white">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === activeTodos.length - 1}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
          >
            Next →
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

