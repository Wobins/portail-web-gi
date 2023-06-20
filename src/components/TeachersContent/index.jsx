import React, { useState, useEffect } from 'react';
import { 
    Divider, 
    CircularProgress,
    Button, 
    Box, 
    TextField, 
    Select,
    InputLabel,
    MenuItem,
    FormControl, FormLabel, Radio, RadioGroup, FormControlLabel 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Auth } from 'aws-amplify';
import { getTeachers, addTeacher } from '../../api/teacherAPI';
import generateUniqueId from '../../utils/generateUniqueId';
import teachersColumns from '../../utils/teachersColumns';


const TeachersContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [teachersData, setTeachersData] = useState({
        id: generateUniqueId(),
        name: "",
        phone: "",
        email: "",
        status: "",
        isManager: false
    });
    const [admin, setAdmin] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    // Function to check if a user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setAdmin(user);
        } catch (error) {
            console.log('No user logged in');
        }
    };

    
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
            setIsLoading(false);
        }
    
        get_teachers();
    }, [showForm, teachers]);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    return (
        <>
            <h1>Enseignants</h1>
            <Divider />

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
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
                                            <FormControl fullWidth>
                                                <InputLabel id="status">Statut</InputLabel>
                                                <Select
                                                    labelId="status"
                                                    id="status-id"
                                                    name="status"
                                                    label="Statut" 
                                                    value={teachersData.status} 
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="MC">MC</MenuItem>
                                                    <MenuItem value="CC">CC</MenuItem>
                                                    <MenuItem value="ASS">ASS</MenuItem>
                                                    <MenuItem value="VAC">VAC</MenuItem>
                                                    <MenuItem value="VAC Pro">VAC Pro</MenuItem>
                                                </Select>
                                            </FormControl>
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
                            {
                                admin && 
                                    <div className="text-end my-3">
                                        <Button variant="contained" color="error">Supprimer</Button>
                                        <Button variant="contained" color="success" onClick={handleAddBtn} className='ms-2'>
                                            Ajouter
                                        </Button>
                                    </div>
                            }
                            {
                                isLoading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                        <CircularProgress /> <br />
                                        <h5 className="fw-semibold">Chargement en cours</h5>
                                        <span className="">Veuillez patienter svp.</span>
                                    </div>
                                ) : (
                                    <DataGrid
                                        rows={teachers}
                                        columns={teachersColumns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 15, 20, 25]}
                                        onRowSelectionModelChange={(newRowSelectionModel) => {
                                            setRowSelectionModel(newRowSelectionModel);
                                            console.log(newRowSelectionModel)
                                        }}
                                        rowSelectionModel={rowSelectionModel}
                                        checkboxSelection = {admin ? true : false}
                                    />
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    );
}

export default TeachersContent;