'use client';

import Link from 'next/link';
import { CheckSquare, Heart, Shield, Zap, Users, Code, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your device. No servers, no tracking, no data collection. Complete privacy guaranteed.',
    },
    {
      icon: Zap,
      title: 'Always Free',
      description: 'All features, forever free. No premium tiers, no subscriptions, no hidden costs. We believe productivity tools should be accessible to everyone.',
    },
    {
      icon: Users,
      title: 'User Focused',
      description: 'Built with real user needs in mind. Every feature is designed to solve actual productivity challenges faced by real people.',
    },
    {
      icon: Code,
      title: 'Open Innovation',
      description: 'Built with modern technologies and best practices. Clean code, excellent performance, and continuous improvements.',
    },
  ];

  const techStack = [
    { name: 'Next.js 14', purpose: 'React framework with App Router' },
    { name: 'TypeScript', purpose: 'Type-safe development' },
    { name: 'Tailwind CSS', purpose: 'Beautiful, responsive design' },
    { name: '@dnd-kit', purpose: 'Drag and drop functionality' },
    { name: 'Recharts', purpose: 'Analytics visualizations' },
    { name: 'date-fns', purpose: 'Date manipulation' },
  ];

  const milestones = [
    { version: 'v1.0.0', date: 'October 2025', title: 'Initial Release', description: 'Core todo functionality with filtering and sorting' },
    { version: 'v2.0.0', date: 'November 2025', title: 'Advanced Features', description: 'Subtasks, time tracking, analytics, Kanban board, and more' },
    { version: 'v2.1.0', date: 'Coming Soon', title: 'Enhanced Experience', description: 'Recurring tasks, templates, and improved mobile experience' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>Made with passion for productivity</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Productivity.AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            A modern, feature-rich task management application built to help you organise your life without compromising your privacy or your wallet.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckSquare size={48} className="mx-auto text-blue-500 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We believe that powerful productivity tools should be accessible to everyone, without sacrificing privacy or requiring subscriptions. Productivity.AI was built to provide enterprise-level features in a simple, privacy-focused application that anyone can use.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you are a student managing coursework, a professional handling projects, or anyone trying to stay organised, we want to help you achieve more while respecting your privacy and keeping things simple.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
            We use cutting-edge technologies to deliver the best experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 flex items-start gap-4"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {tech.purpose}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap/Milestones */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Development Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-blue-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-2">
                      {milestone.version}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart size={48} className="mx-auto text-white mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Built with Love for the Community
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            This project is open to feedback and suggestions. We are constantly improving based on real user needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              Start Using Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all text-lg font-semibold"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
            <Shield size={56} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Commitment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Your data is stored exclusively on your device using browser localStorage. We have no servers, no databases, no accounts, and no way to access your data. What happens on your device, stays on your device.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-green-500 mb-1">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Servers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-1">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tracking</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-1">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accounts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-1">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Private</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

