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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DefinitionsContent = () => {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        document.title = "Lexique";
    }, []);

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
                                        // sx={{
                                        //     '& > :not(style)': { m: 1, width: '25ch' },
                                        // }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div className='mb-3'>
                                            <TextField fullWidth id="defID" label="Mot ou expression" />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField fullWidth id="definition" label="Definition" multiline rows={5} />
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
                            <div className="text-end my-3">
                                <Button variant="contained" color="success" onClick={handleAddBtn}>
                                    Ajouter
                                </Button>
                            </div>
                            
                            <Accordion className=''>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Blockchain </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                    <div className="text-end">
                                        <Button variant="contained" size='small' color="error">Supprimer</Button>
                                        <Button variant="contained" size='small' color="warning" className='ms-2'>Modifier</Button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Cryptographie</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )
                }
            </div>
        </>
    );
}

export default DefinitionsContent;