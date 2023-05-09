import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TeachersContent from '../../components/TeachersContent';

const Teachers = () => {
  useEffect(() => {
    document.title = "Enseignants - Portail Web GI"
  }, [])

  return (
    <MainLayout 
      component={<TeachersContent />}
    />
  );
}

export default Teachers;