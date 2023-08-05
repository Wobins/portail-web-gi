import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Button, 
    Box, 
    TextField, 
    CircularProgress 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createDefinition, deleteDefinition } from '../../graphql/mutations';
import { listDefinitions } from '../../graphql/queries';
import generateUniqueId from '../../utils/generateUniqueId';


const DefinitionsContent = () => {
    const [definitions, setDefinitions] = useState([]);
    const [formData, setFormData] = useState({
        term: "",
        meaning: ""
    });
    const [isDeleted, setIsDeleted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(null);

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
        setFormData({term: "", meaning: ""});
    }

    const handleDelete = async (id) => {
        try {
            const deletedDefinition = await API.graphql({
                query: deleteDefinition,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            setIsDeleted(!isDeleted);
            console.log(deletedDefinition);
        } catch (error) {console.log(error)}
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newDefinition = await API.graphql({
                query: createDefinition,
                variables: {
                    input: {
                        "id": generateUniqueId(),
                        "term": formData.term,
                        "meaning": formData.meaning
                    }
                }
            });
            setFormData({term: "", meaning: ""});
            setShowForm(false);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDefinitions = async () => {
        try {
          const definitionData = await API.graphql(graphqlOperation(listDefinitions))
          const definitions = definitionData.data.listDefinitions.items
          setDefinitions(definitions);
          setIsLoading(false);
        } catch (err) { console.log(err) }
    }
    
    useEffect(() => {
        fetchDefinitions();
    }, [showForm, isDeleted]);

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
                <h1>Definitions</h1>
            </div>

            <div className='mt-5' style={{ width: '100%' }}>
                {
                    showForm ? (
                        <>
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <Box
                                        component="form"
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <TextField 
                                            required fullWidth 
                                            margin='normal'
                                            id="term" 
                                            label="Mot ou expression" 
                                            name='term'
                                            value={formData.term}
                                            onChange={handleChange}
                                        />
                                        <TextField 
                                            required fullWidth multiline 
                                            margin='normal'
                                            id="definition" 
                                            label="Definition" 
                                            rows={5} 
                                            name='meaning'
                                            value={formData.meaning}
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

                            {isLoading ? (
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                    <CircularProgress /> <br />
                                    <h5 className="fw-semibold">Chargement en cours</h5>
                                    <span className="">Veuillez patienter svp.</span>
                                </div>
                            ) : (
                                definitions.map((def) => (
                                    <Accordion className='' key={def.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={def.id}
                                        >
                                            <Typography className=''>{def.term} </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {def.meaning}
                                            </Typography>
                                            <div className="text-end">
                                                {
                                                    admin && 
                                                        <Button 
                                                            variant="contained" 
                                                            size='small' 
                                                            color="error"
                                                            onClick={() => handleDelete(def.id)}
                                                        >
                                                            Supprimer
                                                        </Button>
                                                }
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            )}
                        </>
                    )
                }
            </div>
        </>
    );
}

export default DefinitionsContent;