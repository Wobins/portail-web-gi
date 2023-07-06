import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Card, 
    CardMedia, 
    CardContent,
    Typography,
} from '@mui/material';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js';



const PDFViewer = ({url, code, label, school_year, added_at}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Card sx={{maxWidth: 350,}} className='shadow-md mt-3'>
            <CardMedia className='container' component={Link} to={url}>
                <Document
                    className='container'
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    renderMode='canvas'
                >
                    <Page pageNumber={1} width={300} height={800} />
                </Document>
            </CardMedia>
            <CardContent className='bg-light py-2'>
                <div className='mb-3 text-center'>
                    <Typography variant="h7" gutterBottom>{code}</Typography><br />
                    <Typography variant="h6" gutterBottom component={Link} to={url} target='_blank'>
                        {label}
                    </Typography><br />
                    <Typography variant="h7" gutterBottom>{school_year}</Typography>
                </div>
                <div>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align='right'>
                    {added_at}
                </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default PDFViewer;
