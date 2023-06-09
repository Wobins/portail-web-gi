import React, { useState, useEffect } from 'react';
import { Divider, Button, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FileUploader } from '@aws-amplify/ui-react';
import { columns } from '../../utils/coursesColumns';
import { getCourses } from '../../api/courseAPI'

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


const CoursesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [courses, setCourses] = useState([]);

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
    const fetchCourses = async () => {
        const res = await getCourses();
        const data = res.data;
        return data;
    }
    
    useEffect(() => {
        document.title = "Entreprises";

        const get_courses = async () => {
            const courses = await fetchCourses();
            setCourses(courses);
        }
    
        get_courses();
    }, []);

    return (
        <>
            <h1>Cours</h1>
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
                                        // sx={{
                                        //     '& > :not(style)': { m: 1, width: '25ch' },
                                        // }}
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
                                            <FileUploader
                                                acceptedFileTypes={['.doc', '.docx', '.pdf', '.xls']}
                                                accessLevel="public"
                                                maxFileCount={1}
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
                            <DataGrid
                                rows={courses}
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

export default CoursesContent;