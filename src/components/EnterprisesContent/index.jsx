import React, { useState, useEffect } from 'react';
import { addCompany, getCompanies } from '../../api/companyAPI';
import { Divider, Button, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import generateUniqueId from '../../utils/generateUniqueId';
import companiesColumns from '../../utils/companiesColumns';


const EnterprisesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [companyData, setCompanyData] = useState({
        id: generateUniqueId(),
        name: "",
        industry: "",
        email: "",
        website: ""
    })

    
    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setShowForm(false);
        // let id;
        // const uniqueID = generateUniqueId();
        // setCompanyData({...companyData, [id]: uniqueID});
        // const companyData_string = JSON.stringify(companyData);
        const res = await addCompany(companyData)
        const {data} = res;
        console.log(data)
    }

    const resetForm = () => {
        setCompanyData({
            id: generateUniqueId(),
            name: "",
            industry: "",
            email: "",
            website: ""
        });
        setShowForm(false)
    }

    // Fetch companies
    const fetchCompanies = async () => {
        const res = await getCompanies();
        const data = res.data;
        return data;
    }
    
    useEffect(() => {
        document.title = "Entreprises";
    }, []);
    
    useEffect(() => {
        const get_companies = async () => {
            const companiesFromServer = await fetchCompanies();
            setCompanies(companiesFromServer);
        }
    
        get_companies();
    }, [showForm, companies]);

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
                                        onSubmit={handleSubmit}
                                        // sx={{
                                        //     '& > :not(style)': { m: 1, width: '25ch' },
                                        // }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="name" 
                                                name="name" 
                                                label="Nom de l'entreprise" 
                                                value={companyData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="industry" 
                                                name="industry" 
                                                label="Secteur" 
                                                value={companyData.industry}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="email" 
                                                name="email" 
                                                type='email' 
                                                label="Email" 
                                                value={companyData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                fullWidth 
                                                id="website" 
                                                name="website" 
                                                label="Site web" 
                                                value={companyData.website}
                                                onChange={handleChange}
                                            />
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
                            <div className="text-end my-3">
                                <Button variant="contained" color="error">Supprimer</Button>
                                <Button variant="contained" color="success" onClick={handleAddBtn} className='ms-2'>
                                    Ajouter
                                </Button>
                            </div>
                            <DataGrid
                                rows={companies}
                                columns={companiesColumns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 25 },
                                    },
                                }}
                                pageSizeOptions={[10, 15, 20, 25]}
                                checkboxSelection
                                // style={{height: "50vh", width: "60vw"}}
                            />
                        </>
                    )
                }              
            </div>
        </>
    );
}

export default EnterprisesContent;