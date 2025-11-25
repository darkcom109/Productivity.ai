'use client';

import { Todo } from '@/types/todo';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Check, Trash2, Calendar, Tag, Clock } from 'lucide-react';
import { getCategoryColor, formatDueDate, getDueDateColor } from '@/utils/helpers';

interface KanbanCardProps {
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

export default function KanbanCard({
  todo,
  onToggle,
  onDelete,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const completedSubtasks = todo.subtasks.filter(st => st.completed).length;
  const totalSubtasks = todo.subtasks.length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold mb-1 text-sm ${
              todo.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {todo.title}
          </h4>

          {todo.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1 mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getCategoryColor(todo.category)}`}>
              {todo.category}
            </span>
          </div>

          {totalSubtasks > 0 && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              ✓ {completedSubtasks}/{totalSubtasks} subtasks
            </div>
          )}

          {todo.dueDate && (
            <div className={`flex items-center gap-1 text-xs mb-2 ${getDueDateColor(todo.dueDate)}`}>
              <Calendar size={12} />
              {formatDueDate(todo.dueDate)}
            </div>
          )}

          {todo.tags.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Tag size={12} />
              {todo.tags.slice(0, 2).join(', ')}
              {todo.tags.length > 2 && ` +${todo.tags.length - 2}`}
            </div>
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onToggle(todo.id)}
              className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
              title={todo.completed ? 'Mark as active' : 'Mark as complete'}
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

