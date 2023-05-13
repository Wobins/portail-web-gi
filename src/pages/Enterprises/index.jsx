import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import EnterprisesContent from '../../components/EnterprisesContent';

const Definitions = () => {
  useEffect(() => {
    document.title = "Entreprises - Portail Web GI"
  }, [])

  return (
    <MainLayout 
      component={<EnterprisesContent />}
    />
  );
}

export default Definitions;
