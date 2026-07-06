export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'admin';
  completedModules: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tint: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
  completed: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: number;
  slides: Slide[];
  notes?: string;
  voiceoverUrl?: string;
}

export interface Slide {
  id: string;
  lessonId: string;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  passed: boolean;
  answers: number[];
  completedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  certificateNumber: string;
}
