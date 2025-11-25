import { Priority } from '@/types/todo';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
    case 'high':
      return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'work':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'personal':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'shopping':
      return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
    case 'health':
      return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const formatDueDate = (dueDate: string | null): string => {
  if (!dueDate) return '';
  
  const date = new Date(dueDate);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  if (isPast(date) && !isToday(date)) {
    return `Overdue (${format(date, 'MMM d')})`;
  }
  
  return format(date, 'MMM d, yyyy');
};

export const getDueDateColor = (dueDate: string | null): string => {
  if (!dueDate) return '';
  
  const date = new Date(dueDate);
  
  if (isPast(date) && !isToday(date)) {
    return 'text-red-600 dark:text-red-400 font-semibold';
  }
  
  if (isToday(date)) {
    return 'text-orange-600 dark:text-orange-400 font-semibold';
  }
  
  if (isTomorrow(date)) {
    return 'text-yellow-600 dark:text-yellow-400';
  }
  
  return 'text-gray-600 dark:text-gray-400';
};

