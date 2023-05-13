import React, { useState, useEffect } from 'react';
import { Divider, Button, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'Code EC', width: 250 },
    { field: 'lastName', headerName: 'Intitule', width: 150 },
    {field: 'annee', headerName: 'Annee scolaire', type: 'number', width: 150},
    {field: 'age', headerName: 'Actions', type: 'number', width: 150},
];

const EnterprisesContent = () => {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        document.title = "Entreprises";
    }, []);

    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
        console.log("hello from courses");
    }

    return (
        <>
            <h1>Entreprises</h1>
            <Divider />

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
                            <div className="row my-3">
                                <div className="col-lg-6 offset-lg-3">
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& > :not(style)': { m: 1, width: '25ch' },
                                        // }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div className='mb-3'>
                                            <TextField fullWidth id="codeEC" label="Nom de l'entreprise" />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="title" label="Secteur" />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="title" type='email' label="Email" />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="title" label="Site web" />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">                    
                                                <Button variant="outlined" color="error" onClick={handleUndoBtn}>
                                                    Annuler
                                                </Button>
                                            </div>
                                            <div className="col-6 text-end">
                                                <Button 
                                                    variant='contained' 
                                                    type='submit'
                                                    onClick={handleSubmit}
                                                >
                                                    Enregistrer
                                                </Button>
                                            </div>
                                        </div>
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
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 15, 20, 25]}
                                checkboxSelection
                            />
                        </>
                    )
                }              
            </div>
        </>
    );
}

export default EnterprisesContent;