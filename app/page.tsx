'use client';

import Link from 'next/link';
import { CheckSquare, Sparkles, Clock, BarChart3, ListChecks, Zap, ArrowRight, Star, Users, Download } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: ListChecks,
      title: 'Subtasks & Checklists',
      description: 'Break down complex tasks into manageable subtasks and track your progress.',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Built-in timer to track time spent on each task and improve your productivity.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Visualize your productivity with comprehensive charts and statistics.',
    },
    {
      icon: Zap,
      title: 'Drag & Drop',
      description: 'Reorder your tasks effortlessly with intuitive drag-and-drop functionality.',
    },
    {
      icon: Sparkles,
      title: 'Kanban Board',
      description: 'Visual board organised by priority for better task management.',
    },
    {
      icon: Download,
      title: 'Import/Export',
      description: 'Backup your data with JSON or CSV export and import functionality.',
    },
  ];

  const stats = [
    { label: 'Features', value: '15+' },
    { label: 'Components', value: '20+' },
    { label: 'Keyboard Shortcuts', value: '7' },
    { label: 'Always Free', value: '100%' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span>Version 2.0 - Now with Advanced Features</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-in">
              Organise Your Life with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                Productivity.AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              The most advanced todo list application with subtasks, time tracking, analytics, Kanban boards, and more. All for free, with complete privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/app"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-lg font-semibold flex items-center gap-2"
              >
                Launch App
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/features"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:shadow-lg transition-all text-lg font-semibold border-2 border-gray-200 dark:border-gray-700"
              >
                Explore Features
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to supercharge your productivity, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Productivity.AI?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Star className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      100% Free Forever
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No subscriptions, no hidden costs. All features available to everyone, always.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <CheckSquare className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Complete Privacy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All data stored locally on your device. No servers, no tracking, no data collection.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Sign Up Required
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start using immediately. No accounts, no emails, no passwords to remember.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                      <CheckSquare className="text-white" size={20} />
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                      <Star className="text-white" size={20} />
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Organised?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start managing your tasks more effectively today. No sign up required.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Get Started Now
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}

