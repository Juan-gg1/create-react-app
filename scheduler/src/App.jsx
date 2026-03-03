import React from 'react';
import Banner from './Banner';
import CourseList from './CourseList';
import './App.css';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *- *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);

  if (!response.ok) throw new Error("Error loading data");

  const schedule = await response.json();

  return {
    ...schedule,
    courses: Object.fromEntries(
      Object.entries(schedule.courses).map(
        ([key, value]) => [key, addCourseTimes(value)]
      )
    )
  };
};

const Main = () => {
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  if (error) return <h1>Error loading data</h1>;
  if (isLoading) return <h1>Loading Courses...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;