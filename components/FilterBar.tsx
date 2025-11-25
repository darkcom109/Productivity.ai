'use client';

import { TodoFilters, Priority, Category, SortOption, FilterOption } from '@/types/todo';
import { Search, Filter, Trash2 } from 'lucide-react';

interface FilterBarProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  onClearCompleted: () => void;
  completedCount: number;
  totalCount: number;
  activeCount: number;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  onClearCompleted,
  completedCount,
  totalCount,
  activeCount,
}: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4 border border-gray-200 dark:border-gray-700">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
          Total: <span className="font-semibold">{totalCount}</span>
        </div>
        <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full">
          Active: <span className="font-semibold">{activeCount}</span>
        </div>
        <div className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full">
          Completed: <span className="font-semibold">{completedCount}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          placeholder="Search todos..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value as FilterOption })
            }
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                category: e.target.value as Category | 'all',
              })
            }
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priority: e.target.value as Priority | 'all',
              })
            }
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({ ...filters, sortBy: e.target.value as SortOption })
            }
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="manual">Manual Order</option>
            <option value="dateCreated">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Clear Completed Button */}
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Trash2 size={16} />
          Clear {completedCount} Completed Todo{completedCount !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}

