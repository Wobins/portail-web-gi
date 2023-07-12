import React, { useState, useEffect } from 'react';
import { 
    Divider, 
    Button, 
    Box, 
    TextField, 
    CircularProgress, 
    Checkbox, 
    Card,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
} from '@mui/material';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { SearchField } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import PDFViewer from '../PDFViewer';
import { getCommunications, deleteCommunication } from '../../api/pressAPI';
import searchArray from '../../utils/searchArray';


const PressReleasesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [communications, setCommunications] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [selectedCommunications, setSelectedCommunications] = useState([]);
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

    const handleCheckboxSelection = (elementId) => {
        if (selectedCommunications.includes(elementId)) {
          // Si l'élément est déjà dans le tableau, on le retire
          setSelectedCommunications(selectedCommunications.filter(item => item !== elementId));
        } else {
          // Sinon, on l'ajoute au tableau
          setSelectedCommunications([...selectedCommunications, elementId]);
        }
    };

    const onChange = (event) => {
      setQuery(event.target.value);
    };  
    const onClear = () => {
      setQuery('');
    };

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
    const handleDelete = () => {
        selectedCommunications.map(comId => {
            deleteCommunication(comId)
                .then(() => {
                    setCommunications(prevItems => prevItems.filter(item => item.id !== comId));
                    console.log(selectedCommunications)
                    console.log(communications)
                    // setSelectedCommunications(prevItems => prevItems.filter(item => item.id !== comId));
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
            return "OK without problem";
        });
        setSelectedCommunications([]);
        setOpen(false);
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
            setIsLoading(false);
        }
    
        get_communications();
    }, [showForm]);

    useEffect(() => {
        const interval = setInterval(checkUserLoggedIn, 1000);
    
        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
    }, []);

    return (
        <>
            <h1>Communiqués</h1>
            <Divider />

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField 
                                            fullWidth 
                                            margin='normal'
                                            id="title" 
                                            label="Sujet"
                                        />
                                        <TextField 
                                            fullWidth 
                                            margin='normal'
                                            id="school-year" 
                                            label="Année academique" 
                                        />
                                        <div className="my-3">
                                            <StorageManager
                                                acceptedFileTypes={['.pdf']}
                                                accessLevel="public"
                                                maxFileCount={1}
                                                path='press-releases/'
                                                displayText={{
                                                    dropFilesText: 'Porter et déposer ici ou',
                                                    browseFilesText: 'Ouvrir l\'explorateur',
                                                    getFilesUploadedText(count) {
                                                      return `${count} documents téléversés`;
                                                    },
                                                }}
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
                                                    // fullWidth 
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
                            {
                                admin && 
                                    <div className="text-end my-3">
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            style={{textTransform: 'none'}}
                                            disabled={
                                                isLoading || communications.length === 0 || selectedCommunications.length === 0 ? true : false
                                            }
                                            onClick={handleClickOpen}
                                        >
                                            Supprimer
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            onClick={handleAddBtn} 
                                            className='ms-2' 
                                            style={{textTransform: 'none'}}
                                            disabled={isLoading ? true : false}
                                        >
                                            Ajouter
                                        </Button>
                                    </div>
                            }
                            
                            <SearchField
                                label="Search"
                                placeholder="Filtrer par date, EC, ou initule ..."
                                hasSearchButton={false}
                                hasSearchIcon={true}
                                labelHidden={true}
                                onChange={onChange}
                                onClear={onClear}
                                value={query}
                            />

                            <div className="row mt-5">
                                {
                                    isLoading ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                            <CircularProgress />
                                            <h5 className="fw-semibold">Chargement en cours</h5>
                                            <span className="">Veuillez patienter svp.</span>
                                        </div>
                                    ) : (
                                        searchArray(query, communications).map((el, index) => (
                                            <div className="col-xl-4 col-md-6" key={index}>
                                                <div className="text-end my-3">
                                                    <Card id={el.id}>
                                                        {
                                                            admin && (
                                                                <Checkbox 
                                                                    size="small" 
                                                                    onChange={() => handleCheckboxSelection(el.id)}
                                                                />
                                                            )
                                                        }
                                                        <PDFViewer
                                                            url={el.url}
                                                            label={el.label}
                                                            code={el.code}
                                                            school_year={el.school_year}
                                                            added_at={new Date(el.added_at).toLocaleDateString('en-GB')}
                                                        />
                                                    </Card>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
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
                <DialogTitle id="alert-dialog-title" className='text-danger'>
                    {"Etes vous sur de vouloir supprimer?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous etes sur le point de supprimer {selectedCommunications.length} communiques. Cette action est irreversible. Voulez vous tout de meme continuer?
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

export default PressReleasesContent;