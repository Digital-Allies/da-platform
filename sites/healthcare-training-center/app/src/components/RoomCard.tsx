import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../types';
import { ProgressBar } from './ProgressBar';
import './RoomCard.css';

export interface RoomCardProps {
  course: Course;
}

export const RoomCard: React.FC<RoomCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="room-card">
      <div className="room-card__header" style={{ backgroundColor: course.color }}>
        <span className="room-card__icon">{course.icon}</span>
      </div>
      <div className="room-card__content">
        <h3 className="room-card__title">{course.title}</h3>
        <p className="room-card__description">{course.description}</p>
        <div className="room-card__progress">
          <ProgressBar value={course.completedModules} max={course.totalModules} color={course.color} size="sm" />
        </div>
        <p className="room-card__meta">
          {course.completedModules} of {course.totalModules} modules
        </p>
      </div>
    </Link>
  );
};
