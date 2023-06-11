import { useState, useEffect } from 'react';
import {
    Button, 
    Divider, 
    TextField,
    Box,
    CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getDefinition, updateDefinition } from '../../api/definitionAPI';

const DefinitionContent = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [defId, setDefId] = useState(id)
    const [definition, setDefinition] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isToModify, setIsToModify] = useState(false);
    const [formData, setFormData] = useState({
        term: "",
        meaning: ""
    });
    const [initialFormData, setInitialFormData] = useState("");

    useEffect(() => {
        document.title = "Lexique";
    }, []);

    useEffect(() => {
        const get_definition = async (def) => {
            const definitionFromServer = await fetchDefinition(def);
            setFormData(definitionFromServer);
            setInitialFormData(definitionFromServer);
            console.log(definitionFromServer);
        }
        
        get_definition(id);
    }, [id]);

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
    const handleUndoBtn = () => {
        setFormData(initialFormData);
        setIsToModify(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateDefinition(id, formData);
            console.log(res);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    const fetchDefinition = async (defId) => {
        const res = await getDefinition(defId);
        return res.data;
    };

    return (
        <>
            <h1>Lexique</h1>
            <Divider />

            <div className='mt-3' style={{ width: '100%' }}>
                <>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <Box
                                component="form"
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                sx={{display: 'flex', flexDirection: 'column'}}
                            >
                                    <TextField 
                                        required fullWidth 
                                        autoFocus={isToModify}
                                        InputProps={{readOnly: isToModify ? false : true,}}
                                        id="term" 
                                        label="Mot ou expression" 
                                        name='term'
                                        value={formData.term}
                                        onChange={handleChange}
                                        margin='normal'
                                    />
                                    <TextField 
                                        required fullWidth multiline 
                                        InputProps={{readOnly: isToModify ? false : true,}}
                                        id="definition" 
                                        label="Definition" 
                                        rows={5} 
                                        name='meaning'
                                        value={formData.meaning}
                                        onChange={handleChange}
                                        margin='normal'
                                    />
                                <div className="row">
                                    <div className="col-6 order-1">   
                                        {isToModify &&
                                            <Button variant="outlined" color="error" onClick={handleUndoBtn}>
                                                Annuler
                                            </Button>
                                        }                 
                                    </div>
                                    <div className="col-6 order-2 text-end">
                                        {
                                            isToModify ? (
                                                <Button 
                                                    color="success"
                                                    variant='contained' 
                                                    type='submit'
                                                >
                                                    Enregistrer
                                                </Button>
                                            ):(
                                                <Button 
                                                    color="warning"
                                                    variant='contained'
                                                    onClick={() => setIsToModify(true)}
                                                >
                                                    Modifier
                                                </Button>

                                            )
                                        }
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}

export default DefinitionContent;

