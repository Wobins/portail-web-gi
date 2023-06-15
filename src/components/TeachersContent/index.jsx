import React, { useState, useEffect } from 'react';
import { 
    Divider, Button, Box, TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getTeachers, addTeacher } from '../../api/teacherAPI';
import generateUniqueId from '../../utils/generateUniqueId';
import teachersColumns from '../../utils/teachersColumns';


const TeachersContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [teachersData, setTeachersData] = useState({
        id: generateUniqueId(),
        name: "",
        phone: "",
        email: "",
        status: "",
        isManager: false
    });
    
    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
        setTeachersData({
            id: generateUniqueId(),
            name: "",
            phone: "",
            email: "",
            status: "",
            isManager: false
        });
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setTeachersData({ ...teachersData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addTeacher(teachersData);
            const { data } = res;
            console.log(data);
            setShowForm(false);
            setTeachersData({
                id: generateUniqueId(),
                name: "",
                phone: "",
                email: "",
                status: "",
                isManager: false
            });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }

    const fetchTeachers = async () => {
        const res = await getTeachers();
        const data = res.data;
        return data;
    }
    
    useEffect(() => {
        document.title = "Enseignants";
    }, []);

    useEffect(() => {
        const get_teachers = async () => {
            const teachers = await fetchTeachers();
            setTeachers(teachers);
        }
    
        get_teachers();
    }, [showForm, teachers]);

    return (
        <>
            <h1>Enseignants</h1>
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
                                        onSubmit={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="fullName" 
                                                name="name" 
                                                label="Nom complet" 
                                                value={teachersData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="email" 
                                                name="email"
                                                label="Email" 
                                                type='email' 
                                                value={teachersData.email} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="status" 
                                                name="status"
                                                label="Statut" 
                                                value={teachersData.status} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="phone" 
                                                name='phone'
                                                type='phone' 
                                                label="Telephone" 
                                                value={teachersData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">
                                                    Chef de departement
                                                </FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={teachersData.isManager}
                                                >
                                                    <FormControlLabel 
                                                        value={true} 
                                                        control={<Radio />} 
                                                        label="Oui" 
                                                    />
                                                    <FormControlLabel 
                                                        value={false} 
                                                        control={<Radio />} 
                                                        label="Non" 
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <Button 
                                            fullWidth 
                                            variant='contained' 
                                            type='submit'
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
                                rows={teachers}
                                columns={teachersColumns}
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

export default TeachersContent;