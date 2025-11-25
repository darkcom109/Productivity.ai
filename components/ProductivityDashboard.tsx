'use client';

import { ProductivityStats } from '@/types/todo';
import { TrendingUp, Clock, CheckCircle2, Archive, Target, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface ProductivityDashboardProps {
  stats: ProductivityStats;
}

export default function ProductivityDashboard({ stats }: ProductivityDashboardProps) {
  const categoryData = Object.entries(stats.completionsByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const priorityData = Object.entries(stats.completionsByPriority).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#6b7280'];
  const PRIORITY_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <TrendingUp className="text-blue-500" />
        Productivity Analytics
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-blue-500" size={20} />
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTodos}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completedTodos}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            {stats.completionRate.toFixed(1)}% completion rate
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-purple-500" size={20} />
            <span className="text-sm text-gray-600 dark:text-gray-400">Time Tracked</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatTime(stats.totalTimeTracked)}
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Avg: {formatTime(Math.floor(stats.avgTimePerTodo))}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Archive className="text-orange-500" size={20} />
            <span className="text-sm text-gray-600 dark:text-gray-400">Archived</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.archivedTodos}</p>
        </div>
      </div>

      {/* Recent Completions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <Calendar size={24} className="mx-auto mb-2 text-gray-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayCompleted}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <Calendar size={24} className="mx-auto mb-2 text-gray-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.weekCompleted}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <Calendar size={24} className="mx-auto mb-2 text-gray-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.monthCompleted}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">By Category</h3>
          {categoryData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              No completed tasks yet
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">By Priority</h3>
          {priorityData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6">
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400 dark:text-gray-500">
              No completed tasks yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

