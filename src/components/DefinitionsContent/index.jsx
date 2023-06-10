import { useState, useEffect } from 'react';
import {
    Button, 
    Accordion, 
    Divider, 
    AccordionSummary, 
    AccordionDetails, 
    Typography, 
    TextField,
    Box,
    CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { getDefinitions, addDefinition, deleteDefinition } from '../../api/definitionAPI';

const DefinitionsContent = () => {
    const [showForm, setShowForm] = useState(false);
    const [definitions, setDefinitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isToModify, setIsToModify] = useState(false);
    const [formData, setFormData] = useState({
        term: "",
        meaning: ""
    })

    useEffect(() => {
        document.title = "Lexique";
    }, []);

    useEffect(() => {
        const get_definitions = async () => {
            const definitionsFromServer = await fetchDefinitions();
            setDefinitions(definitionsFromServer);
        }
    
        get_definitions();
    }, [showForm, definitions]);

    useEffect(() => {
        setIsLoading(true); 
        setTimeout(() => {
          setIsLoading(false); // Finish loading after a delay
        }, 2000);
    }, []);
      
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };
    const handleAddBtn = () => {
        setShowForm(true);
    };
    const handleUndoBtn = () => {
        setShowForm(false);
    };
    const handleDelete = (itemId) => {
        deleteDefinition(itemId)
          .then(() => {
            setDefinitions(prevItems => prevItems.filter(item => item.id !== itemId));
          })
          .catch(error => {
            console.error('Error deleting item:', error);
          });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addDefinition(formData);
            const { data } = res;
            console.log(data);
            setShowForm(false);
            setFormData({term: "", meaning: ""});
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    const fetchDefinitions = async () => {
        const res = await getDefinitions();
        const data = res.data;
        return data;
    };

    return (
        <>
            <h1>Lexique</h1>
            <Divider />

            <div className='mt-3' style={{ width: '100%' }}>
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
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className='mb-3'>
                                            <TextField 
                                                required fullWidth 
                                                id="term" 
                                                label="Mot ou expression" 
                                                name='term'
                                                value={formData.term}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField 
                                                required fullWidth multiline 
                                                id="definition" 
                                                label="Definition" 
                                                rows={5} 
                                                name='meaning'
                                                value={formData.meaning}
                                                onChange={handleChange}
                                            />
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
                                <Button variant="contained" color="success" onClick={handleAddBtn}>
                                    Ajouter
                                </Button>
                            </div>

                            {isLoading ? (
                                <div className="text-center py-5">
                                    <CircularProgress /> Chargement des elements ...
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
                                                <Button 
                                                    variant="contained" 
                                                    size='small' 
                                                    color="error"
                                                    onClick={() => handleDelete(def.id)}
                                                >
                                                    Supprimer
                                                </Button>
                                                <Button 
                                                    variant="contained" 
                                                    size='small' 
                                                    color="warning" 
                                                    className='ms-2'
                                                    component={Link}
                                                    to={`${def.id}`}
                                                >
                                                    Voir
                                                </Button>
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