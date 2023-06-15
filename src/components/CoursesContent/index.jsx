import React, { useState, useEffect } from 'react';
import { Divider, Button, Box, TextField } from '@mui/material';
import { SearchField } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import PDFViewer from '../PDFViewer';
import searchArray from '../../utils/searchArray';
import { getCourses } from '../../api/courseAPI'


const CoursesContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');

    const onChange = (event) => {
      setQuery(event.target.value);
    };  
    const onClear = () => {
      setQuery('');
    };
    // const searchCourse = (tab) => {
    //     let newTab = tab.filter(el => (
    //         query.toLowerCase() === "" ? el : (el.label + el.code).toLowerCase().includes(query)
    //     ));
    //     return newTab;  
    // }

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
                                            <StorageManager
                                                acceptedFileTypes={['.doc', '.docx', '.pdf', '.xls']}
                                                accessLevel="public"
                                                maxFileCount={1}
                                                path='/courses'
                                                displayText={{
                                                    dropFilesText: 'Porter et deposer ici ou',
                                                    browseFilesText: 'Ouvrir l\'explorateur',
                                                    getFilesUploadedText(count) {
                                                      return `${count} documents téléversés`;
                                                    },
                                                }}
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

                            <div className="text-end my-3">
                                <Button variant="contained" color="error">Supprimer</Button>
                                <Button variant="contained" color="success" onClick={handleAddBtn} className='ms-2'>
                                    Ajouter
                                </Button>
                            </div>
                            <div className="row">
                                {
                                    searchArray(query, courses).map((el, index) => (
                                        <div className="col-lg-4 col-md-6" key={index}>
                                            <div className="container">
                                                <PDFViewer
                                                    url={el.url}
                                                    label={el.label}
                                                    code={el.code}
                                                    school_year={el.school_year}
                                                    added_at={new Date(el.added_at).toLocaleDateString('en-GB')}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }              
            </div>
        </>
    );
}

export default CoursesContent;