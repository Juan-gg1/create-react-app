import React from "react";

const Course = ({ course, selected, conflict, toggleSelected }) => {
  const className = `
    card m-1 p-2
    ${selected ? 'selected' : ''}
    ${conflict ? 'conflict' : ''}
  `;

  return (
    <div className={className} onClick={toggleSelected}>
      <div className="card-body">
        <div className="card-title fw-bold">
          {course.term} CS {course.number}
        </div>

        <div className="card-text">
          {course.title}
        </div>

        <div className="text-muted small mt-2">
          {course.meets}
        </div>
      </div>
    </div>
  );
};

export default Course;