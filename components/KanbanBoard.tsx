'use client';

import { Todo, Priority } from '@/types/todo';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import KanbanCard from '@/components/KanbanCard';
import { Clock, AlertCircle, CheckCircle2, Archive } from 'lucide-react';

interface KanbanBoardProps {
  todos: Todo[];
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

export default function KanbanBoard({
  todos,
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
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const todosByPriority: Record<Priority, Todo[]> = {
    urgent: todos.filter(t => t.priority === 'urgent' && !t.completed && !t.archived),
    high: todos.filter(t => t.priority === 'high' && !t.completed && !t.archived),
    medium: todos.filter(t => t.priority === 'medium' && !t.completed && !t.archived),
    low: todos.filter(t => t.priority === 'low' && !t.completed && !t.archived),
  };

  const completedTodos = todos.filter(t => t.completed && !t.archived);
  const archivedTodos = todos.filter(t => t.archived);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const todoId = active.id as string;
    const newPriority = over.id as Priority;

    if (['urgent', 'high', 'medium', 'low'].includes(newPriority)) {
      onUpdate(todoId, { priority: newPriority });
    }

    setActiveId(null);
  };

  const columns: { id: Priority | 'completed' | 'archived'; title: string; icon: any; color: string }[] = [
    { id: 'urgent', title: 'Urgent', icon: AlertCircle, color: 'bg-red-500' },
    { id: 'high', title: 'High Priority', icon: Clock, color: 'bg-orange-500' },
    { id: 'medium', title: 'Medium Priority', icon: Clock, color: 'bg-yellow-500' },
    { id: 'low', title: 'Low Priority', icon: Clock, color: 'bg-green-500' },
    { id: 'completed', title: 'Completed', icon: CheckCircle2, color: 'bg-blue-500' },
  ];

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTodos = column.id === 'completed' 
            ? completedTodos 
            : column.id === 'archived'
            ? archivedTodos
            : todosByPriority[column.id as Priority];

          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 ${column.color} rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{columnTodos.length} tasks</p>
                </div>
              </div>

              <SortableContext
                id={column.id}
                items={columnTodos.map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[200px]">
                  {columnTodos.map((todo) => (
                    <KanbanCard
                      key={todo.id}
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      onArchive={onArchive}
                      onStartTimer={onStartTimer}
                      onStopTimer={onStopTimer}
                      getTotalTime={getTotalTime}
                      onAddSubtask={onAddSubtask}
                      onToggleSubtask={onToggleSubtask}
                      onDeleteSubtask={onDeleteSubtask}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 opacity-90">
            Dragging...
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

