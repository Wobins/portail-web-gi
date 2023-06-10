import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import DefinitionContent from '../../components/DefinitionContent';

const Definition = () => {
  // const {id} = useParams();
  // const [defId, setDefId] = useState(id);

  return (
    <MainLayout 
      component={<DefinitionContent />}
    />
  );
}

export default Definition;
