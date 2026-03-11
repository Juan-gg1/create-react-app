import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setData } from '../utilities/firebase';
import { useUserState } from '../utilities/firebase';

const EditCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useUserState();
  const course = location.state;

  const [formData, setFormData] = useState({
    id: course?.id || '',
    term: course?.term || '',
    number: course?.number || '',
    title: course?.title || '',
    meets: course?.meets || ''
  });

  if (!course) {
    return (
      <div className="container mt-4">
        No course specified.{' '}
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be signed in to save changes');
      return;
    }

    if (!window.confirm(`Save changes to ${formData.title}?`)) return;

    try {
      const { id, ...courseData } = formData;
      await setData(`schedule/courses/${id}`, courseData);
      alert('Course updated successfully');
      navigate('/');
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID</label>
          <input
            type="text"
            className="form-control"
            name="id"
            value={formData.id}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Term</label>
          <input
            type="text"
            className="form-control"
            name="term"
            value={formData.term}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input
            type="text"
            className="form-control"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Schedule (e.g., MWF 10:00-10:50)</label>
          <input
            type="text"
            className="form-control"
            name="meets"
            value={formData.meets}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCourse;