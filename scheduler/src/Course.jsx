import React from "react";

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = id => terms[id?.charAt(0)] || '';
const getCourseNumber = id => id?.slice(1,4) || '';

const Course = ({ id, course }) => {
  if (!course || !id) return null;

  const meets = course.meets || course.meeting_time || 'Horario no disponible';

  return (
    <div className="card m-1 p-2 shadow-sm">
      <div className="card-body">
        <div className="card-title fw-bold">
          { getCourseTerm(id) } CS { getCourseNumber(id) }
        </div>

        <div className="card-text">{ course.title }</div>

        <div className="text-muted small mt-2">
          { meets }
        </div>
      </div>
    </div>
  );
};

export default Course;