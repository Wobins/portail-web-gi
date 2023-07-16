import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Button, 
    Box, 
    TextField, 
    CircularProgress 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Auth } from 'aws-amplify';
import { addCompany, getCompanies, deleteCompany } from '../../api/companyAPI';
import generateUniqueId from '../../utils/generateUniqueId';
import companiesColumns from '../../utils/companiesColumns';


const EnterprisesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [companyData, setCompanyData] = useState({
        id: generateUniqueId(),
        name: "",
        industry: "",
        email: "",
        website: ""
    });
    const [admin, setAdmin] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
        setCompanyData({
            id: generateUniqueId(),
            name: "",
            industry: "",
            email: "",
            website: ""
        });
    }

    const handleDelete = () => {
        rowSelectionModel.map(companyId => {
            deleteCompany(companyId)
                .then(() => {
                    setCompanies(prevItems => prevItems.filter(item => item.id !== companyId));
                    setRowSelectionModel(prevItems => prevItems.filter(item => item.id !== companyId));
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
            return "OK without problem";
        });
        setOpen(false);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addCompany(companyData);
            const { data } = res;
            console.log(data);
            setShowForm(false);
            setCompanyData({
                id: generateUniqueId(),
                name: "",
                industry: "",
                email: "",
                website: ""
            });
        } catch (error) {
            console.error('Error updating item:', error);
        }
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
            setIsLoading(false);
        }
    
        get_companies();
    }, [showForm, companies]);

    useEffect(() => {
        const interval = setInterval(checkUserLoggedIn, 500);
    
        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
    }, []);

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
                                        // noValidate
                                        autoComplete="off"
                                    >
                                        <TextField 
                                            fullWidth required
                                            margin="normal"                                            
                                            id="name" 
                                            name="name" 
                                            label="Nom de l'entreprise" 
                                            value={companyData.name}
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            fullWidth required
                                            margin="normal"
                                            id="industry" 
                                            name="industry" 
                                            label="Secteur" 
                                            value={companyData.industry}
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            fullWidth required
                                            margin="normal" 
                                            id="email" 
                                            name="email" 
                                            type='email' 
                                            label="Email" 
                                            value={companyData.email}
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            fullWidth required
                                            margin="normal"
                                            id="website" 
                                            name="website" 
                                            label="Site web" 
                                            value={companyData.website}
                                            onChange={handleChange}
                                        />
                                        <div className="row my-3">
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
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            onClick={handleClickOpen} 
                                            style={{textTransform: 'none'}}
                                            disabled={
                                                isLoading || companies.length === 0 || rowSelectionModel.length === 0 ? true : false
                                            }
                                        >
                                            Supprimer
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            onClick={handleAddBtn} 
                                            style={{textTransform: 'none'}} 
                                            className='ms-2'
                                            disabled={isLoading ? true : false}
                                        >
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
                                        rows={companies}
                                        columns={companiesColumns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 15, 20, 25]}
                                        checkboxSelection = {admin ? true : false}
                                        onRowSelectionModelChange={(newRowSelectionModel) => {
                                            setRowSelectionModel(newRowSelectionModel);
                                            console.log(newRowSelectionModel)
                                        }}
                                        rowSelectionModel={rowSelectionModel}
                                    />
                                )
                            }
                        </>
                    )
                }              
            </div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Etes vous sur de vouloir supprimer?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous etes sur le point de supprimer {rowSelectionModel.length} entreprises du systeme. Cette action est irreversible. Voulez vous tout de meme continuer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EnterprisesContent;