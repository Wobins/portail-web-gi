import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import DefinitionsContent from '../../components/DefinitionsContent';

const Definitions = () => {
  useEffect(() => {
    document.title = "Lexique - Portail Web GI"
  }, [])

  return (
    <MainLayout 
      component={<DefinitionsContent />}
    />
  );
}

export default Definitions;
