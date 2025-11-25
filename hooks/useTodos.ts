'use client';

import { useState, useEffect } from 'react';
import { Todo, TodoFilters, Priority, Category, SortOption, Subtask, TimeEntry, ProductivityStats } from '@/types/todo';
import { startOfDay, startOfWeek, startOfMonth, isAfter } from 'date-fns';

const STORAGE_KEY = 'productivity-ai-todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedTodos = JSON.parse(stored);
        // Migrate old todos to new format
        const migratedTodos = parsedTodos.map((todo: any, index: number) => ({
          ...todo,
          archived: todo.archived ?? false,
          subtasks: todo.subtasks ?? [],
          timeEntries: todo.timeEntries ?? [],
          order: todo.order ?? index,
        }));
        setTodos(migratedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (
    title: string,
    description: string,
    priority: Priority,
    category: Category,
    dueDate: string | null,
    tags: string[]
  ) => {
    const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order)) : -1;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      archived: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags,
      subtasks: [],
      timeEntries: [],
      order: maxOrder + 1,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const archiveTodo = (id: string) => {
    updateTodo(id, { archived: true });
  };

  const unarchiveTodo = (id: string) => {
    updateTodo(id, { archived: false });
  };

  const reorderTodos = (newOrder: Todo[]) => {
    const reorderedTodos = newOrder.map((todo, index) => ({
      ...todo,
      order: index,
    }));
    setTodos(reorderedTodos);
  };

  // Subtask management
  const addSubtask = (todoId: string, title: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const newSubtask: Subtask = {
        id: crypto.randomUUID(),
        title,
        completed: false,
      };
      updateTodo(todoId, {
        subtasks: [...todo.subtasks, newSubtask],
      });
    }
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const updatedSubtasks = todo.subtasks.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      updateTodo(todoId, { subtasks: updatedSubtasks });
    }
  };

  const deleteSubtask = (todoId: string, subtaskId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      updateTodo(todoId, {
        subtasks: todo.subtasks.filter(st => st.id !== subtaskId),
      });
    }
  };

  // Time tracking
  const startTimer = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const newEntry: TimeEntry = {
        id: crypto.randomUUID(),
        startTime: new Date().toISOString(),
        endTime: null,
        duration: 0,
      };
      updateTodo(todoId, {
        timeEntries: [...todo.timeEntries, newEntry],
      });
    }
  };

  const stopTimer = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const activeEntry = todo.timeEntries.find(e => e.endTime === null);
      if (activeEntry) {
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - new Date(activeEntry.startTime).getTime()) / 1000);
        const updatedEntries = todo.timeEntries.map(e =>
          e.id === activeEntry.id
            ? { ...e, endTime: endTime.toISOString(), duration }
            : e
        );
        updateTodo(todoId, { timeEntries: updatedEntries });
      }
    }
  };

  const getTotalTime = (todoId: string): number => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return 0;
    return todo.timeEntries.reduce((total, entry) => total + entry.duration, 0);
  };

  // Import/Export
  const exportTodos = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(todos, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `todos-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'csv') {
      const headers = ['Title', 'Description', 'Priority', 'Category', 'Status', 'Due Date', 'Tags', 'Created'];
      const rows = todos.map(todo => [
        todo.title,
        todo.description,
        todo.priority,
        todo.category,
        todo.completed ? 'Completed' : 'Active',
        todo.dueDate || '',
        todo.tags.join('; '),
        new Date(todo.createdAt).toLocaleDateString(),
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      const exportFileDefaultName = `todos-${new Date().toISOString().split('T')[0]}.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const importTodos = (data: string) => {
    try {
      const importedTodos = JSON.parse(data);
      if (Array.isArray(importedTodos)) {
        const migratedTodos = importedTodos.map((todo: any, index: number) => ({
          ...todo,
          id: crypto.randomUUID(), // Generate new IDs to avoid conflicts
          archived: todo.archived ?? false,
          subtasks: todo.subtasks ?? [],
          timeEntries: todo.timeEntries ?? [],
          order: todos.length + index,
        }));
        setTodos(prev => [...prev, ...migratedTodos]);
        return true;
      }
    } catch (error) {
      console.error('Error importing todos:', error);
    }
    return false;
  };

  // Statistics
  const getProductivityStats = (): ProductivityStats => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);

    const completedTodos = todos.filter(t => t.completed && !t.archived);
    const archivedTodos = todos.filter(t => t.archived);
    const activeTodos = todos.filter(t => !t.completed && !t.archived);

    const todayCompleted = completedTodos.filter(t => 
      isAfter(new Date(t.updatedAt), todayStart)
    ).length;

    const weekCompleted = completedTodos.filter(t => 
      isAfter(new Date(t.updatedAt), weekStart)
    ).length;

    const monthCompleted = completedTodos.filter(t => 
      isAfter(new Date(t.updatedAt), monthStart)
    ).length;

    const totalTimeTracked = todos.reduce((total, todo) => 
      total + todo.timeEntries.reduce((sum, entry) => sum + entry.duration, 0), 0
    );

    const completionsByCategory: Record<string, number> = {
      personal: 0, work: 0, shopping: 0, health: 0, other: 0
    };
    completedTodos.forEach(todo => {
      completionsByCategory[todo.category]++;
    });

    const completionsByPriority: Record<string, number> = {
      urgent: 0, high: 0, medium: 0, low: 0
    };
    completedTodos.forEach(todo => {
      completionsByPriority[todo.priority]++;
    });

    return {
      totalTodos: todos.filter(t => !t.archived).length,
      completedTodos: completedTodos.length,
      activeTodos: activeTodos.length,
      archivedTodos: archivedTodos.length,
      completionRate: todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0,
      totalTimeTracked,
      avgTimePerTodo: completedTodos.length > 0 ? totalTimeTracked / completedTodos.length : 0,
      todayCompleted,
      weekCompleted,
      monthCompleted,
      completionsByCategory: completionsByCategory as any,
      completionsByPriority: completionsByPriority as any,
    };
  };

  const filterAndSortTodos = (filters: TodoFilters): Todo[] => {
    let filtered = [...todos];

    // Filter by archived status
    if (filters.status === 'archived') {
      filtered = filtered.filter((todo) => todo.archived);
    } else {
      filtered = filtered.filter((todo) => !todo.archived);
      
      // Filter by completion status (only for non-archived)
      if (filters.status === 'active') {
        filtered = filtered.filter((todo) => !todo.completed);
      } else if (filters.status === 'completed') {
        filtered = filtered.filter((todo) => todo.completed);
      }
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter((todo) => todo.category === filters.category);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filtered = filtered.filter((todo) => todo.priority === filters.priority);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'manual':
          return a.order - b.order;
        case 'dateCreated':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    archiveTodo,
    unarchiveTodo,
    reorderTodos,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    startTimer,
    stopTimer,
    getTotalTime,
    exportTodos,
    importTodos,
    getProductivityStats,
    filterAndSortTodos,
    isLoaded,
  };
}

