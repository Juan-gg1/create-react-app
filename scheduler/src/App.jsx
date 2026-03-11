import { Routes, Route } from 'react-router-dom';
import Banner from './Banner';
import CourseList from './components/CourseList.jsx';
import EditCourse from './components/EditCourse';
import { useData } from "./utilities/useData.jsx";
import './App.css';


const Main = () => {
  const [schedule, loading, error] = useData('schedule');

  if (error) return <h1>Error loading data</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/edit" element={<EditCourse />} />
    </Routes>
  );
};

export default App;