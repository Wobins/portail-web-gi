import {useRef, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import emailjs from '@emailjs/browser';
import {
    Button,
    TextField,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import createSubscription from '../../api/subscriptionAPI';
import './styles.css'

const SubscriptionDialog = () => {
    const subscriptionForm = useRef();
    const [openDialog, setOpenDialog] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [email, setEmail] = useState("");

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleSubscribe = async (e) => {
        e.preventDefault();
        Cookies.set('subscribed', true, { expires: 365 })
        const res = await createSubscription({email: email});
        if (res.status === 201) {
            emailjs.sendForm('service_pw6faxk', 'template_r86fzfc', subscriptionForm.current, 'err_HFhc-K3m1OQFM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }
        setOpenDialog(false);
        // Show the alert
        setShowAlert(true);

        // Hide the alert after 5 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        Cookies.set('isVisiting', true)
    };
    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    useEffect(() => {
        let subscriptionCookies = Cookies.get('subscribed');
        let trackingCookies = Cookies.get('isVisiting');
        if (trackingCookies) {
            setOpenDialog(false);
        } else {
            !subscriptionCookies && handleOpenDialog();
        }
    }, []);

    return (
        <>
            <Dialog open={openDialog} component="form" ref={subscriptionForm} onSubmit={handleSubscribe}>
                <DialogTitle className='border-bottom mb-3'>
                    Souscription
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer votre adresse email afin de recevoir des mises a jour concernant l'ajout de nouvelles ressources.Vous recevrez un email de confirmation par la suite.
                    </DialogContentText>
                    <TextField
                        autoFocus required fullWidth
                        margin="dense"
                        id="subscription-email"
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant='outlined' color='error'>Annuler</Button>
                    <Button type='submit' variant='contained'>Souscrire</Button>
                </DialogActions>
            </Dialog>

            {
                showAlert && (
                    <Alert severity="success" className='success-alert' onClose={() => setShowAlert(false)}>
                      Votre souscription a été effectuée avec succès!
                    </Alert>
                )
            }
        </>
    );
}

export default SubscriptionDialog;