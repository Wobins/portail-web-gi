import {useRef, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import emailjs from '@emailjs/browser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import createSubscription from '../../api/subscriptionAPI';

const SubscriptionDialog = () => {
    const subscriptionForm = useRef();
    const [openDialog, setOpenDialog] = useState(false);
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
        <Dialog open={openDialog} component="form" ref={subscriptionForm} onSubmit={handleSubscribe}>
            <DialogTitle className='border-bottom mb-3'>
                Subscribe
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
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
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
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button type='submit'>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SubscriptionDialog;