'use client';

import { useState, useEffect, useRef } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoFilters, ViewMode, ColorTheme } from '@/types/todo';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import DraggableTodoList from '@/components/DraggableTodoList';
import KanbanBoard from '@/components/KanbanBoard';
import ProductivityDashboard from '@/components/ProductivityDashboard';
import ImportExport from '@/components/ImportExport';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import PomodoroTimer from '@/components/PomodoroTimer';
import FocusMode from '@/components/FocusMode';
import ThemeSelector from '@/components/ThemeSelector';
import QuickActionsMenu from '@/components/QuickActionsMenu';
import { CheckSquare, Loader2, LayoutGrid, List, TrendingUp, Download, HelpCircle, Zap, Clock } from 'lucide-react';

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
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('default');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = filterAndSortTodos(filters);
  const completedCount = todos.filter((t) => t.completed && !t.archived).length;
  const activeCount = todos.filter((t) => !t.completed && !t.archived).length;
  const stats = getProductivityStats();

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ColorTheme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  const handleThemeChange = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  // Get theme colors
  const getThemeGradient = () => {
    switch (currentTheme) {
      case 'ocean':
        return 'from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20';
      case 'sunset':
        return 'from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20';
      case 'forest':
        return 'from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20';
      case 'lavender':
        return 'from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20';
      case 'monochrome':
        return 'from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      default:
        return 'from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
            setViewMode((prev) => (prev === 'list' ? 'kanban' : prev === 'kanban' ? 'focus' : 'list'));
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
          case 'p':
            e.preventDefault();
            setShowPomodoro((prev) => !prev);
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
        setShowPomodoro(false);
        setShowThemes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoaded) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${getThemeGradient()} flex items-center justify-center transition-colors`}>
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your todos...</p>
        </div>
      </div>
    );
  }

  const enableDragAndDrop = filters.sortBy === 'manual' && filters.status !== 'archived';

  // Focus Mode
  if (viewMode === 'focus') {
    return (
      <FocusMode
        todos={filteredTodos}
        onToggle={toggleTodo}
        onClose={() => setViewMode('list')}
        onStartTimer={(id) => {
          setShowPomodoro(true);
          setViewMode('list');
        }}
      />
    );
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br ${getThemeGradient()} py-8 px-4 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Glassmorphism */}
        <div className="text-center mb-8 relative">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CheckSquare size={40} className="text-blue-500 animate-float" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Productivity.AI
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              Your advanced task management solution
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <div className="glass dark:glass-dark rounded-xl px-4 py-2 backdrop-blur-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Active: <span className="font-bold text-blue-600 dark:text-blue-400">{activeCount}</span>
                </span>
              </div>
              <div className="glass dark:glass-dark rounded-xl px-4 py-2 backdrop-blur-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Completed: <span className="font-bold text-green-600 dark:text-green-400">{completedCount}</span>
                </span>
              </div>
              <div className="glass dark:glass-dark rounded-xl px-4 py-2 backdrop-blur-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rate: <span className="font-bold text-purple-600 dark:text-purple-400">{stats.completionRate.toFixed(0)}%</span>
                </span>
              </div>
            </div>

            {/* Action Buttons with Enhanced UI */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
                className="glass dark:glass-dark hover:shadow-xl transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-gray-700 dark:text-gray-300"
                title="Toggle View (Ctrl+K)"
              >
                {viewMode === 'list' ? <LayoutGrid size={18} /> : <List size={18} />}
                {viewMode === 'list' ? 'Kanban' : 'List'}
              </button>
              
              <button onClick={() => setViewMode('focus')}
              
                className="glass dark:glass-dark hover:shadow-glow transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold"
              >
                <Zap size={18} />
                Focus Mode
              </button>

              <button
                onClick={() => setShowPomodoro(true)}
                className="glass dark:glass-dark hover:shadow-xl transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-red-600 dark:text-red-400"
              >
                <Clock size={18} />
                Pomodoro
              </button>
              
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="glass dark:glass-dark hover:shadow-xl transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-gray-700 dark:text-gray-300"
                title="Analytics (Ctrl+A)"
              >
                <TrendingUp size={18} />
                Analytics
              </button>
              
              <button
                onClick={() => setShowImportExport(true)}
                className="glass dark:glass-dark hover:shadow-xl transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-gray-700 dark:text-gray-300"
                title="Import/Export (Ctrl+E)"
              >
                <Download size={18} />
                Export
              </button>
              
              <button
                onClick={() => setShowShortcuts(true)}
                className="glass dark:glass-dark hover:shadow-xl transition-all rounded-xl px-4 py-2 border border-white/20 backdrop-blur-lg flex items-center gap-2 text-gray-700 dark:text-gray-300"
                title="Shortcuts (?)"
              >
                <HelpCircle size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="mb-6 animate-slide-in">
            <ProductivityDashboard stats={stats} />
          </div>
        )}

        {/* Theme Selector */}
        {showThemes && (
          <div className="mb-6 animate-slide-in">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
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
            <div className="glass dark:glass-dark rounded-2xl shadow-2xl p-12 text-center border border-white/20 backdrop-blur-lg animate-fade-in">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <CheckSquare size={64} className="mx-auto opacity-30 animate-float" />
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
      
      {showPomodoro && <PomodoroTimer onClose={() => setShowPomodoro(false)} />}

      {/* Quick Actions Menu */}
      <QuickActionsMenu
        onNewTodo={() => setShowAddForm(true)}
        onPomodoro={() => setShowPomodoro(true)}
        onFocusMode={() => setViewMode('focus')}
        onTemplates={() => {}}
        onThemes={() => setShowThemes(!showThemes)}
      />
    </main>
  );
}
