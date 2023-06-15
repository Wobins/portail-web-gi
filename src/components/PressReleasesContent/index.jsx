import React, { useState, useEffect } from 'react';
import { Divider, Button, Box, TextField } from '@mui/material';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import PDFViewer from '../PDFViewer';
import { getCommunications } from '../../api/pressAPI';


const PressReleasesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [communications, setCommunications] = useState([]);

    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
        console.log("hello from communications");
    }
    const fetchCommunications = async () => {
        const res = await getCommunications();
        const data = res.data;
        return data;
    }
    
    useEffect(() => {
        const get_communications = async () => {
            const communications = await fetchCommunications();
            setCommunications(communications);
        }
    
        get_communications();
    }, []);

    return (
        <>
            <h1>Communiqués</h1>
            <Divider />

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
                            <div className=" my-3">
                                <Button variant="outlined" color="error" onClick={handleUndoBtn}>
                                    Annuler
                                </Button>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div className='mb-3'>
                                            <TextField fullWidth id="codeEC" label="Code EC" placeholder='EC GL 123' />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="title" label="Intitule" />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="description" label="Annee academique" />
                                        </div>
                                        <div className="mb-3">
                                            <StorageManager
                                                acceptedFileTypes={['.doc', '.docx', '.pdf', '.xls']}
                                                accessLevel="public"
                                                maxFileCount={1}
                                                path='/pres-releases'
                                                displayText={{
                                                    dropFilesText: 'Porter et deposer ici ou',
                                                    browseFilesText: 'Ouvrir l\'explorateur',
                                                    getFilesUploadedText(count) {
                                                      return `${count} documents téléversés`;
                                                    },
                                                }}
                                            />
                                        </div>
                                        <Button 
                                            fullWidth 
                                            variant='contained' 
                                            type='submit'
                                            onClick={handleSubmit}
                                        >
                                            Enregistrer
                                        </Button>
                                    </Box>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-end my-3">
                                <Button variant="contained" color="error">Supprimer</Button>
                                <Button variant="contained" color="success" onClick={handleAddBtn} className='ms-2'>
                                    Ajouter
                                </Button>
                            </div>

                            <div className="row">
                                {
                                    communications.map((el, index) => {
                                        <div className="col-lg-4 col-md-6">
                                            <div className="container">
                                                <PDFViewer />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                    )
                }              
            </div>
        </>
    );
}

export default PressReleasesContent;