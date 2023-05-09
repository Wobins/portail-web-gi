import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import CoursesContent from '../../components/CoursesContent';

const Courses = () => {
  useEffect(() => {
    document.title = "Cours - Portail Web GI"
  }, [])

  return (
    <MainLayout 
      component={<CoursesContent />}
    />
  );
}

export default Courses;