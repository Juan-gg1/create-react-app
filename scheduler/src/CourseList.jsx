import React, { useState } from "react";
import Course from "./Course";

const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input
      type="radio"
      id={term}
      className="btn-check"
      autoComplete="off"
      checked={checked}
      onChange={() => setTerm(term)}
    />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const TermSelector = ({ term, setTerm }) => (
  <div className="btn-group mb-3">
    {Object.values(terms).map(value => (
      <TermButton
        key={value}
        term={value}
        setTerm={setTerm}
        checked={value === term}
      />
    ))}
  </div>
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');

  const termCourses = Object.values(courses)
    .filter(course => term === course.term);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />

      <div className="course-list">
        {termCourses.map(course => (
          <Course key={`${course.term}${course.number}`} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseList;