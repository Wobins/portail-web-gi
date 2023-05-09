import React from 'react';
import { Divider, Button, } from '@mui/material';
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

const CoursesContent = () => {
    return (
        <>
            <h1>Cours</h1>
            <Divider />

            <div className='mt-5' style={{ width: '100%' }}>
                <div className="text-end my-3">
                    <Button variant="contained" color="error">Supprimer</Button>
                    <Button variant="contained" color="success" className='ms-2'>Ajouter</Button>
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
            </div>
        </>
    );
}

export default CoursesContent;