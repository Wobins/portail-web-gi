import * as React from 'react';
import {    Button, 
            Accordion, 
            Divider, 
            AccordionSummary, 
            AccordionDetails, 
            Typography, 
        } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DefinitionsContent = () => {
    return (
        <>
            <h1>Lexique</h1>
            <Divider />

            <div className='mt-3' style={{ width: '100%' }}>
                <div className="text-end my-3">
                    <Button variant="contained" color="success">Ajouter</Button>
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
            </div>
        </>
    );
}

export default DefinitionsContent;