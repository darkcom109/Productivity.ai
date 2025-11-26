'use client';

import { useState, useEffect, useRef } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoFilters, ViewMode } from '@/types/todo';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import DraggableTodoList from '@/components/DraggableTodoList';
import KanbanBoard from '@/components/KanbanBoard';
import ProductivityDashboard from '@/components/ProductivityDashboard';
import ImportExport from '@/components/ImportExport';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { CheckSquare, Loader2, LayoutGrid, List, TrendingUp, Download, HelpCircle } from 'lucide-react';

export default function Home() {
  const {
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
  } = useTodos();

  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all',
    sortBy: 'dateCreated',
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = filterAndSortTodos(filters);
  const completedCount = todos.filter((t) => t.completed && !t.archived).length;
  const activeCount = todos.filter((t) => !t.completed && !t.archived).length;
  const stats = getProductivityStats();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            setShowAddForm(true);
            break;
          case 'k':
            e.preventDefault();
            setViewMode((prev) => (prev === 'list' ? 'kanban' : 'list'));
            break;
          case 'a':
            e.preventDefault();
            setShowAnalytics((prev) => !prev);
            break;
          case 'e':
            e.preventDefault();
            setShowImportExport((prev) => !prev);
            break;
          case 'f':
            e.preventDefault();
            searchInputRef.current?.focus();
            break;
        }
      }

      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(true);
      }

      if (e.key === 'Escape') {
        setShowAnalytics(false);
        setShowImportExport(false);
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your todos...</p>
        </div>
      </div>
    );
  }

  const enableDragAndDrop = filters.sortBy === 'manual' && filters.status !== 'archived';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckSquare size={40} className="text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Productivity.AI
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Your advanced task management solution
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              title="Toggle View (Ctrl+K)"
            >
              {viewMode === 'list' ? <LayoutGrid size={20} /> : <List size={20} />}
              {viewMode === 'list' ? 'Kanban View' : 'List View'}
            </button>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              title="Analytics (Ctrl+A)"
            >
              <TrendingUp size={20} />
              Analytics
            </button>
            <button
              onClick={() => setShowImportExport(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              title="Import/Export (Ctrl+E)"
            >
              <Download size={20} />
              Import/Export
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              title="Keyboard Shortcuts (?)"
            >
              <HelpCircle size={20} />
              Shortcuts
            </button>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="mb-6">
            <ProductivityDashboard stats={stats} />
          </div>
        )}

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Filter Bar */}
        {todos.length > 0 && (
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onClearCompleted={clearCompleted}
              completedCount={completedCount}
              totalCount={todos.filter(t => !t.archived).length}
              activeCount={activeCount}
            />
          </div>
        )}

        {/* Todo List / Kanban Board */}
        <div>
          {filteredTodos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <CheckSquare size={64} className="mx-auto opacity-30" />
              </div>
              {todos.length === 0 ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No todos yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Click the button above to create your first todo! Or press{' '}
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                      Ctrl+N
                    </kbd>
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No todos match your filters
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </>
              )}
            </div>
          ) : viewMode === 'list' ? (
            <DraggableTodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onArchive={archiveTodo}
              onReorder={reorderTodos}
              onStartTimer={startTimer}
              onStopTimer={stopTimer}
              getTotalTime={getTotalTime}
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
              enableDragAndDrop={enableDragAndDrop}
            />
          ) : (
            <KanbanBoard
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onArchive={archiveTodo}
              onStartTimer={startTimer}
              onStopTimer={stopTimer}
              getTotalTime={getTotalTime}
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
            />
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Showing {filteredTodos.length} of {todos.filter(t => !t.archived).length} todo
              {todos.filter(t => !t.archived).length !== 1 ? 's' : ''}
              {enableDragAndDrop && ' • Drag to reorder'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showImportExport && (
        <ImportExport
          onExport={exportTodos}
          onImport={importTodos}
          onClose={() => setShowImportExport(false)}
        />
      )}

      {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}
    </main>
  );
}
