'use client';

import { Todo } from '@/types/todo';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import TodoItem from './TodoItem';

interface DraggableTodoItemProps {
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

export default function DraggableTodoItem(props: DraggableTodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2 group">
      <button
        {...attributes}
        {...listeners}
        className="mt-4 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={20} />
      </button>
      <div className="flex-1">
        <TodoItem {...props} />
      </div>
    </div>
  );
}

