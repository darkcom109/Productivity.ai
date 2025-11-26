'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap, X } from 'lucide-react';

interface PomodoroTimerProps {
  onClose: () => void;
  todoTitle?: string;
}

export default function PomodoroTimer({ onClose, todoTitle }: PomodoroTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (!isBreak) {
      // Work session completed
      setCompletedPomodoros(completedPomodoros + 1);
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Complete!', {
          body: 'Time for a break! Great work! 🎉',
          icon: '/favicon.ico'
        });
      }
      // Start break
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
    } else {
      // Break completed
      if (Notification.permission === 'granted') {
        new Notification('Break Over!', {
          body: 'Ready to start another pomodoro? 💪',
          icon: '/favicon.ico'
        });
      }
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
    }
  };

  const toggleTimer = () => {
    if (!isActive && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const skipToBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(5);
    setSeconds(0);
  };

  const progress = isBreak 
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            {isBreak ? (
              <Coffee size={28} className="text-green-500" />
            ) : (
              <Zap size={28} className="text-blue-500" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isBreak ? 'Break Time' : 'Focus Time'}
            </h2>
          </div>
          {todoTitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Working on: {todoTitle}
            </p>
          )}
        </div>

        {/* Timer Display */}
        <div className="relative mb-8">
          {/* Circular Progress */}
          <svg className="w-full h-64" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              transform="rotate(-90 100 100)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isBreak ? '#10b981' : '#3b82f6'} />
                <stop offset="100%" stopColor={isBreak ? '#059669' : '#8b5cf6'} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Time Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {isBreak ? 'Relax & recharge' : 'Stay focused'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
            }`}
          >
            {isActive ? (
              <>
                <Pause size={20} />
                Pause
              </>
            ) : (
              <>
                <Play size={20} />
                Start
              </>
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {completedPomodoros}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Completed Today
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {completedPomodoros * 25}m
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Focus Time
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {!isBreak && !isActive && (
          <button
            onClick={skipToBreak}
            className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Skip to break
          </button>
        )}
      </div>
    </div>
  );
}

