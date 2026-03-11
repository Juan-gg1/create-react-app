import { hasConflict, toggle } from '../utilities/times.jsx';
import { useUserState } from '../utilities/firebase.jsx';
import { useNavigate } from "react-router-dom";

export const Course = ({ course, selected, setSelected }) => {

  const navigate = useNavigate();
  const [user] = useUserState();

  const isSelected = selected.some(c => c.term === course.term && c.number === course.number);
  const isDisabled = !isSelected && hasConflict(course, selected);

  const style = {
    backgroundColor:
      isSelected ? 'lightgreen' :
      isDisabled ? '#ffb3b3' :
      'white',
    cursor: user ? 'pointer' : 'not-allowed',
    opacity: user ? 1 : 0.7
  };

  const handleClick = () => {
    if (!user) {
      alert('You must log in to select courses');
      return;
    }
    if (!isDisabled) {
      setSelected(toggle(course, selected));
    }
  };

  const handleDoubleClick = () => {
    if (!user) {
      alert('You must log in to edit courses');
      return;
    }
    navigate('/edit', { state: course });
  };

  return (
    <div
      className="card m-1 p-2"
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="card-body">
        <div className="card-title fw-bold">
          {course.term} CS {course.number}
        </div>
        <div className="card-text">{course.title}</div>
        <div className="card-text">{course.meets}</div>
      </div>
    </div>
  );
};