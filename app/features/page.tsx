'use client';

import Link from 'next/link';
import { 
  ListChecks, Clock, BarChart3, Zap, Sparkles, Download, 
  Keyboard, Archive, GripVertical, Tag, Calendar, CheckCircle2,
  ArrowRight, Layers
} from 'lucide-react';

export default function FeaturesPage() {
  const featureCategories = [
    {
      category: 'Core Features',
      features: [
        {
          icon: CheckCircle2,
          title: 'Smart Task Management',
          description: 'Create, edit, and organise tasks with rich metadata including priority levels, categories, due dates, and custom tags.',
          highlights: ['4 Priority Levels', '5 Categories', 'Unlimited Tags', 'Due Date Tracking'],
        },
        {
          icon: ListChecks,
          title: 'Subtasks & Checklists',
          description: 'Break down complex tasks into manageable subtasks. Track progress with visual indicators showing completed vs total subtasks.',
          highlights: ['Unlimited Subtasks', 'Progress Tracking', 'Independent Completion', 'Nested Organisation'],
        },
        {
          icon: Clock,
          title: 'Time Tracking',
          description: 'Built-in timer for each task. Track time across multiple sessions and view accumulated time for accurate productivity measurement.',
          highlights: ['Start/Stop Timer', 'Multiple Sessions', 'Time Analytics', 'Duration Display'],
        },
      ],
    },
    {
      category: 'Visualization & Views',
      features: [
        {
          icon: Sparkles,
          title: 'Kanban Board View',
          description: 'Visual board organised by priority (Urgent, High, Medium, Low, Completed). Drag cards between columns to change priorities instantly.',
          highlights: ['5 Priority Columns', 'Drag Between Columns', 'Compact Cards', 'Quick Overview'],
        },
        {
          icon: GripVertical,
          title: 'Drag & Drop Reordering',
          description: 'Manually reorder your tasks with intuitive drag-and-drop. Perfect for creating custom daily workflows and prioritization.',
          highlights: ['Manual Ordering', 'Visual Feedback', 'Touch Support', 'Instant Save'],
        },
        {
          icon: Layers,
          title: 'Multiple List Views',
          description: 'Switch between list and Kanban views. Each view maintains full functionality with all features accessible.',
          highlights: ['List View', 'Kanban View', 'Quick Toggle', 'Persistent Filters'],
        },
      ],
    },
    {
      category: 'Productivity & Analytics',
      features: [
        {
          icon: BarChart3,
          title: 'Analytics Dashboard',
          description: 'Comprehensive productivity statistics with visual charts. Track completion rates, time spent, and identify patterns in your work.',
          highlights: ['Completion Rates', 'Time Statistics', 'Category Charts', 'Priority Analysis'],
        },
        {
          icon: Calendar,
          title: 'Time Period Tracking',
          description: 'See how many tasks you completed today, this week, and this month. Track your productivity trends over time.',
          highlights: ['Daily Completions', 'Weekly Summary', 'Monthly Overview', 'Trend Analysis'],
        },
      ],
    },
    {
      category: 'Power User Features',
      features: [
        {
          icon: Keyboard,
          title: 'Keyboard Shortcuts',
          description: 'Complete keyboard navigation for lightning-fast task management. Every major action has a keyboard shortcut.',
          highlights: ['7+ Shortcuts', 'Platform Aware', 'No Mouse Needed', 'Quick Access'],
        },
        {
          icon: Download,
          title: 'Import/Export',
          description: 'Export your data to JSON (full backup) or CSV (spreadsheet). Import previously exported data to restore or transfer.',
          highlights: ['JSON Export', 'CSV Export', 'Easy Import', 'Data Portability'],
        },
        {
          icon: Archive,
          title: 'Archive System',
          description: 'Archive completed tasks instead of deleting them. Keep your active list clean while preserving historical data.',
          highlights: ['Non-Destructive', 'Preserve History', 'Easy Restore', 'Separate View'],
        },
        {
          icon: Tag,
          title: 'Advanced Filtering',
          description: 'Powerful search and filter system. Search by title, description, or tags. Filter by status, category, and priority.',
          highlights: ['Smart Search', 'Multiple Filters', 'Real-time Results', '5 Sort Options'],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Maximum Productivity
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Everything you need to organise your tasks, track your time, and boost your productivity. All features included, always free.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Try It Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features by Category */}
      {featureCategories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-16 ${categoryIndex % 2 === 1 ? 'bg-white/50 dark:bg-gray-900/50' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.features.map((feature, featureIndex) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={featureIndex}
                    className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all animate-fade-in"
                    style={{ animationDelay: `${featureIndex * 100}ms` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Icon size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {feature.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div
                              key={highlightIndex}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Keyboard Shortcuts Preview */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Keyboard size={48} className="mx-auto text-white mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Keyboard Shortcuts for Power Users
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Navigate the entire app without touching your mouse. Perfect for maximizing efficiency.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[
              { key: 'Ctrl+N', action: 'New Task' },
              { key: 'Ctrl+K', action: 'Toggle View' },
              { key: 'Ctrl+A', action: 'Analytics' },
              { key: 'Ctrl+E', action: 'Import/Export' },
              { key: 'Ctrl+F', action: 'Search' },
              { key: '?', action: 'Help' },
            ].map((shortcut, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <kbd className="px-3 py-1.5 bg-white text-blue-600 rounded font-mono text-sm font-semibold shadow-sm inline-block mb-2">
                  {shortcut.key}
                </kbd>
                <p className="text-white text-sm">{shortcut.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Experience All Features Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            No sign up required. Start organising your tasks in seconds.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Launch App Now
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}

