export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';
export type SortOption = 'dateCreated' | 'dueDate' | 'priority' | 'title' | 'manual';
export type FilterOption = 'all' | 'active' | 'completed' | 'archived';
export type ViewMode = 'list' | 'kanban';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TimeEntry {
  id: string;
  startTime: string;
  endTime: string | null;
  duration: number; // in seconds
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
  priority: Priority;
  category: Category;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  subtasks: Subtask[];
  timeEntries: TimeEntry[];
  order: number;
}

export interface TodoFilters {
  search: string;
  category: Category | 'all';
  priority: Priority | 'all';
  status: FilterOption;
  sortBy: SortOption;
}

export interface ProductivityStats {
  totalTodos: number;
  completedTodos: number;
  activeTodos: number;
  archivedTodos: number;
  completionRate: number;
  totalTimeTracked: number;
  avgTimePerTodo: number;
  todayCompleted: number;
  weekCompleted: number;
  monthCompleted: number;
  completionsByCategory: Record<Category, number>;
  completionsByPriority: Record<Priority, number>;
}

