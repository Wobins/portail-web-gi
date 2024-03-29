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
import { Auth } from 'aws-amplify';
import generateUniqueId from '../../utils/generateUniqueId';
import PDFViewer from '../PDFViewer';
import searchArray from '../../utils/searchArray';
import { getCourses, deleteCourse, addCourse } from '../../api/courseAPI';


const CoursesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseData, setCourseData] = useState({
        id: generateUniqueId(),
        label: "",
        code: "",
        school_year: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckboxSelection = (element) => {
        if (selectedCourses.includes(element)) {
          setSelectedCourses(selectedCourses.filter(item => item !== element));
        } else {
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
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
            return "OK without problem";
        });
        setSelectedCourses([]);
        setOpen(false);
    }

    const handleAddBtn = () => {
        setShowForm(true);
    }
    const handleUndoBtn = () => {
        setShowForm(false);
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(courseData);
            const res = await addCourse(courseData);
            const { data } = res;
            console.log(data);
            setShowForm(false);
            setCourseData({
                id: generateUniqueId(),
                label: "",
                code: "",
                school_year: ""
            });
        } catch (error) {
            console.error('Error creating course:', error);
        }
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
    }, [showForm, courses]);

    useEffect(() => {
        const interval = setInterval(checkUserLoggedIn, 500);

        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className='mb-3 underline-middle'>
                <h1>Cours</h1>
            </div>

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <Box
                                        component="form"
                                        // noValidate
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <TextField 
                                            fullWidth required
                                            margin='normal' 
                                            id="code" 
                                            name='code'
                                            label="Code EC" 
                                            value={courseData.code}
                                            placeholder='GL 123' 
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            fullWidth required
                                            margin='normal' 
                                            id="label" 
                                            name='label'
                                            label="Intitule" 
                                            value={courseData.label}
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            fullWidth required
                                            margin='normal' 
                                            id="school_year" 
                                            name='school_year'
                                            label="Annee academique" 
                                            value={courseData.school_year}
                                            placeholder='2022/2023'
                                            onChange={handleChange} 
                                        />
                                        {
                                            (courseData.label !== "" & courseData.school_year !== "" & courseData.code !== "") ? (
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
                                            ) : (<></>)
                                        }
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
                                                    // disabled={courseData.label === "" & courseData.school_year === "" & courseData.code === "" ? false : true}
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
                                            disabled={
                                                isLoading || courses.length === 0 || selectedCourses.length === 0 ? true : false
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