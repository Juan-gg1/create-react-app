import { useState } from 'react';
import { Course } from './Course.jsx';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.jsx';
import { timeParts } from '../utilities/times.jsx';

export const terms = { F:'Fall', W:'Winter', S:'Spring' };

const SignInButton = () => (
  <button className="btn btn-secondary btn-sm" onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm" onClick={() => signOut()}>
    Sign Out
  </button>
);

export const TermButton = ({term, setTerm, checked}) => (
  <>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={checked}
      autoComplete="off"
      onChange={() => setTerm(term)}
    />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

export const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between mb-3">
      <div className="btn-group">
        {Object.values(terms).map(value => (
          <TermButton
            key={value}
            term={value}
            setTerm={setTerm}
            checked={value === term}
          />
        ))}
      </div>
      { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );
};

export const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const [user] = useUserState();

  const termCourses = Object.entries(courses)
    .map(([id, course]) => ({ id, ...course, ...timeParts(course.meets) }))
    .filter(course => term === course.term);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
        {termCourses.map(course => (
          <Course
            key={course.id}
            course={course}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      {!user && (
        <div className="alert alert-info mt-3">
          You must sign in to select and edit courses
        </div>
      )}
    </>
  );
};

export default CourseList;