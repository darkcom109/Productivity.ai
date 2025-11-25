'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { getPriorityColor, getCategoryColor, formatDueDate, getDueDateColor } from '@/utils/helpers';
import { Check, Trash2, Edit2, X, Save, Calendar, Tag, Clock, Plus, Archive, Play, Square, ListChecks } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onArchive: (id: string) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
  getTotalTime: (id: string) => number;
  onAddSubtask: (todoId: string, title: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onArchive,
  onStartTimer,
  onStopTimer,
  getTotalTime,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');

  const isTimerRunning = todo.timeEntries.some(e => e.endTime === null);
  const totalTime = getTotalTime(todo.id);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onAddSubtask(todo.id, newSubtask);
      setNewSubtask('');
    }
  };

  const completedSubtasks = todo.subtasks.filter(st => st.completed).length;
  const totalSubtasks = todo.subtasks.length;

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-2 border-blue-500 animate-fade-in">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Title"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          placeholder="Description"
          rows={2}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save size={16} />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg border border-gray-200 dark:border-gray-700 ${
        todo.completed ? 'opacity-60' : ''
      } animate-slide-in`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {todo.title}
          </h3>
          
          {todo.description && (
            <p
              className={`text-sm mb-3 ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-md border ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority.toUpperCase()}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryColor(
                todo.category
              )}`}
            >
              {todo.category}
            </span>
            {totalTime > 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center gap-1">
                <Clock size={12} />
                {formatTime(totalTime)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
            {todo.dueDate && (
              <div className={`flex items-center gap-1 ${getDueDateColor(todo.dueDate)}`}>
                <Calendar size={14} />
                {formatDueDate(todo.dueDate)}
              </div>
            )}
            {todo.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag size={14} />
                {todo.tags.join(', ')}
              </div>
            )}
            {totalSubtasks > 0 && (
              <button
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <ListChecks size={14} />
                {completedSubtasks}/{totalSubtasks} subtasks
              </button>
            )}
          </div>

          {/* Subtasks */}
          {showSubtasks && (
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="space-y-2 mb-2">
                {todo.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleSubtask(todo.id, subtask.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        subtask.completed
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {subtask.completed && <Check size={12} className="text-white" />}
                    </button>
                    <span
                      className={`flex-1 text-sm ${
                        subtask.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {subtask.title}
                    </span>
                    <button
                      onClick={() => onDeleteSubtask(todo.id, subtask.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                  placeholder="Add subtask..."
                  className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <button
                  onClick={handleAddSubtask}
                  className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex gap-2 mb-2">
            {isTimerRunning ? (
              <button
                onClick={() => onStopTimer(todo.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Square size={14} />
                Stop Timer
              </button>
            ) : (
              <button
                onClick={() => onStartTimer(todo.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play size={14} />
                Start Timer
              </button>
            )}
            {!showSubtasks && totalSubtasks === 0 && (
              <button
                onClick={() => setShowSubtasks(true)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Plus size={14} />
                Add Subtask
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onArchive(todo.id)}
            className="p-2 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
            title="Archive"
          >
            <Archive size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
