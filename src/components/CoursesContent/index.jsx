import React, { useState, useEffect } from 'react';
import { 
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Divider, 
    Button, 
    Box, 
    TextField, 
    CircularProgress, 
    Checkbox, 
    Card 
} from '@mui/material';
import { SearchField, } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Auth, Amplify, Storage } from 'aws-amplify';
import PDFViewer from '../PDFViewer';
import searchArray from '../../utils/searchArray';
import { getCourses, deleteCourse } from '../../api/courseAPI';


const CoursesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [file, setFile] = useState();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        const { uploadFile } = await StorageManager.getInstance();
        const response = await uploadFile({
        file: file,
        bucket: "tutorial-project-iut",
        key: "courses/my-file.pdf",
        });

    };

    const handleCheckboxSelection = (element) => {
        if (selectedCourses.includes(element)) {
          // Si l'élément est déjà dans le tableau, on le retire
          setSelectedCourses(selectedCourses.filter(item => item !== element));
        } else {
          // Sinon, on l'ajoute au tableau
          setSelectedCourses([...selectedCourses, element]);
        }
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

    const onChange = (event) => {
      setQuery(event.target.value);
    };  
    const onClear = () => {
      setQuery('');
    };

    const handleDelete = () => {
        selectedCourses.map(courseId => {
            deleteCourse(courseId)
                .then(() => {
                    setCourses(prevItems => prevItems.filter(item => item.id !== courseId));
                    setSelectedCourses(prevItems => prevItems.filter(item => item.id !== courseId));
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
            return "OK without problem";
        });
        setOpen(false);
    }

    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
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
            setIsLoading(false);
        }
    
        get_courses();
    }, []);

    useEffect(() => {
        const interval = setInterval(checkUserLoggedIn, 500);

        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
    }, []);

    return (
        <>
            <h1>Cours</h1>
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
                                            margin='normal' 
                                            fullWidth 
                                            id="codeEC" 
                                            label="Code EC" 
                                            placeholder='GL 123' 
                                        />
                                        <TextField 
                                            margin='normal' 
                                            fullWidth 
                                            id="title" 
                                            label="Intitule" 
                                        />
                                        <TextField 
                                            margin='normal' 
                                            fullWidth 
                                            id="school-year" 
                                            label="Annee academique" 
                                            placeholder='2022/2023' 
                                        />
                                        <div className="my-3">
                                            <StorageManager
                                                acceptedFileTypes={['.pdf']}
                                                accessLevel="public"
                                                maxFileCount={1}
                                                path='courses/'
                                                isResumable
                                                displayText={{
                                                    dropFilesText: 'Porter et deposer ici ou',
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
                                            onClick={handleClickOpen}
                                            disabled={isLoading || courses.length === 0 ? true : false}
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
                                            <CircularProgress /> <br />
                                            <h5 className="fw-semibold">Chargement en cours</h5>
                                            <span className="">Veuillez patienter svp.</span>
                                        </div>
                                    ) : (
                                        searchArray(query, courses).map((el, index) => (
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
                <DialogTitle id="alert-dialog-title" className="text-danger">
                    {"Etes vous sur de vouloir supprimer?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous etes sur le point de supprimer {selectedCourses.length} cours. Cette action est irreversible. Voulez vous tout de meme continuer?
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

export default CoursesContent;