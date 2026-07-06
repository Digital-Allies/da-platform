import type { Course, Module } from '../types';

export const mockUser = {
  id: 'user-1',
  name: 'Mom',
  email: 'mom@example.com',
  role: 'learner' as const,
  completedModules: [],
};

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Customer Service',
    description: 'Learn essential customer service skills and best practices',
    icon: '💬',
    color: 'var(--color-room-cs)',
    tint: 'var(--color-room-cs-tint)',
    progress: 0,
    totalModules: 5,
    completedModules: 0,
  },
  {
    id: 'course-2',
    title: 'HIPAA & Privacy',
    description: 'Understand healthcare privacy regulations and patient rights',
    icon: '🔒',
    color: 'var(--color-room-hipaa)',
    tint: 'var(--color-room-hipaa-tint)',
    progress: 0,
    totalModules: 4,
    completedModules: 0,
  },
  {
    id: 'course-3',
    title: 'Compliance',
    description: 'Master compliance requirements and audit procedures',
    icon: '✓',
    color: 'var(--color-room-compliance)',
    tint: 'var(--color-room-compliance-tint)',
    progress: 0,
    totalModules: 6,
    completedModules: 0,
  },
  {
    id: 'course-4',
    title: 'Medical Records',
    description: 'Manage medical records with accuracy and confidentiality',
    icon: '📋',
    color: 'var(--color-room-records)',
    tint: 'var(--color-room-records-tint)',
    progress: 0,
    totalModules: 3,
    completedModules: 0,
  },
  {
    id: 'course-5',
    title: 'Finance & Billing',
    description: 'Handle billing, payments, and financial compliance',
    icon: '💰',
    color: 'var(--color-room-finance)',
    tint: 'var(--color-room-finance-tint)',
    progress: 0,
    totalModules: 4,
    completedModules: 0,
  },
];

export const mockModules: Module[] = [
  {
    id: 'module-1',
    courseId: 'course-1',
    title: 'Introduction to Customer Service',
    description: 'Master the fundamentals of excellent customer service',
    lessons: [
      {
        id: 'lesson-1',
        moduleId: 'module-1',
        title: 'Welcome to Customer Service',
        duration: 12,
        slides: [
          {
            id: 'slide-1',
            lessonId: 'lesson-1',
            title: 'What is Great Customer Service?',
            content: 'Great customer service means understanding patient needs and exceeding expectations.',
            order: 1,
          },
          {
            id: 'slide-2',
            lessonId: 'lesson-1',
            title: 'Key Principles',
            content: 'Listen, empathize, and provide solutions.',
            order: 2,
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-1',
      moduleId: 'module-1',
      title: 'Customer Service Fundamentals Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          quizId: 'quiz-1',
          question: 'What is the first step in customer service?',
          options: ['Ignore the patient', 'Listen actively', 'Sell more services', 'Leave immediately'],
          correctAnswer: 1,
          feedback: 'Correct! Active listening is the foundation of good customer service.',
        },
        {
          id: 'q2',
          quizId: 'quiz-1',
          question: 'How should you respond to an upset patient?',
          options: ['Defend yourself', 'Show empathy and understand', 'Ignore them', 'Be argumentative'],
          correctAnswer: 1,
          feedback: 'Correct! Empathy is key to resolving patient concerns.',
        },
        {
          id: 'q3',
          quizId: 'quiz-1',
          question: 'What does exceeding expectations mean?',
          options: ['Going above the minimum', 'Doing nothing', 'Avoiding contact', 'Limiting help'],
          correctAnswer: 0,
          feedback: 'Correct! Exceeding expectations means going above the minimum required.',
        },
      ],
    },
    completed: false,
  },
];
