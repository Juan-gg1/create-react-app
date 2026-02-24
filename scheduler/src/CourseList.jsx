import Course from './Course';

const CourseList = ({ courses }) => {
  if (!courses) return <p>No hay cursos disponibles</p>;

  return (
    <div className="course-list">
      { Object.entries(courses).map(([id, course]) =>
        <Course key={id} id={id} course={course} />
      )}
    </div>
  );
};

export default CourseList;