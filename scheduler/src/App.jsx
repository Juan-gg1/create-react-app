import React from 'react';
import Banner from './Banner';
import CourseList from './CourseList';
import './App.css';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error loading data");
  return await response.json();
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
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
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