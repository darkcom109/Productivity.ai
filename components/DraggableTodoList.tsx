'use client';

import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableTodoItem from './DraggableTodoItem';

interface DraggableTodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onArchive: (id: string) => void;
  onReorder: (newOrder: Todo[]) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
  getTotalTime: (id: string) => number;
  onAddSubtask: (todoId: string, title: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
  enableDragAndDrop?: boolean;
}

export default function DraggableTodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onArchive,
  onReorder,
  onStartTimer,
  onStopTimer,
  getTotalTime,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  enableDragAndDrop = false,
}: DraggableTodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over.id);
      const newOrder = arrayMove(todos, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  if (!enableDragAndDrop) {
    return (
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
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
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {todos.map((todo) => (
            <DraggableTodoItem
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
    </DndContext>
  );
}

