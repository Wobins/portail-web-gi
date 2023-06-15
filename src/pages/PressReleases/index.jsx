import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PressReleasesContent from '../../components/PressReleasesContent';

const PressReleases = () => {
    useEffect(() => {
        document.title = "Communiques - Portail Web GI"
    }, []);
    
    return (
        <MainLayout 
            component={<PressReleasesContent />}
        />
    );
}

export default PressReleases;