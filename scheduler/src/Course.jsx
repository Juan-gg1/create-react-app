import React from "react";

export const getCourseTerm = (course) => course?.term;

export const getCourseNumber = (course) => course?.number;

const Course = ({ course }) => {
  if (!course) return null;

  return (
    <div className="card m-1 p-2">
      <div className="card-body">
        <div className="card-title fw-bold">
          {getCourseTerm(course)} CS {getCourseNumber(course)}
        </div>

        <div className="card-text">{course.title}</div>

        <div className="text-muted small mt-2">
          {course.meets}
        </div>
      </div>
    </div>
  );
};

export default Course;