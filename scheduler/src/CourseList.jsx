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
  const [selected, setSelected] = useState([]);

  const termCourses = Object.values(courses)
    .filter(course => term === course.term);

  // CONFLICT LOGIC

  const daysOverlap = (days1, days2) =>
    days1?.split('').some(day => days2?.includes(day));

  const hoursOverlap = (hours1, hours2) =>
    hours1 && hours2 &&
    Math.max(hours1.start, hours2.start) <
    Math.min(hours1.end, hours2.end);

  const timeConflict = (course1, course2) =>
    daysOverlap(course1.days, course2.days) &&
    hoursOverlap(course1.hours, course2.hours);

  const toggleSelected = (course) => {
    if (selected.includes(course)) {
      setSelected(selected.filter(x => x !== course));
    } else {
      setSelected([...selected, course]);
    }
  };

  const hasConflict = (course) =>
    selected.some(selectedCourse =>
      selectedCourse !== course &&
      timeConflict(course, selectedCourse)
    );

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />

      <div className="course-list">
        {termCourses.map(course => (
          <Course
            key={`${course.term}${course.number}`}
            course={course}
            selected={selected.includes(course)}
            conflict={hasConflict(course)}
            toggleSelected={() => toggleSelected(course)}
          />
        ))}
      </div>
    </>
  );
};

export default CourseList;