import {useRef, useState, useEffect} from 'react';
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
    Input,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
} from '@mui/material';
import { Auth } from 'aws-amplify';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Amplify.configure(awsconfig);

const LoginDialog = ({isOpened}) => {
    const loginForm = useRef();
    const [openDialog, setOpenDialog] = useState(isOpened);
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);

    // Function to log in a user
    const signIn = async() => {
        try {
          const user = await Auth.signIn(loginData.email, loginData.password);
          const session = await Auth.currentSession();
          console.log(user);
          console.log(session);
        } catch (error) {
          console.log('error signing in', error);
        }

        // try {
        //     const user = await Auth.signIn("azalyange19@gmail.com", "W@@v1904");
            
        //     if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        //       // Handle new password requirement
        //       const newPassword = 'p@ssw0rd';
        //       const updatedUser = await Auth.completeNewPassword(user, newPassword);
        //       console.log('User signed in:', updatedUser.username);
        //     } else {
        //       console.log('User signed in:', user.username);
        //     }
        //   } catch (error) {
        //     console.log('Error signing in:', error);
        //   }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    const handleLogin = (e) => {
        e.preventDefault();
        signIn();
        setLoginData({email: "", password: ""});
        // setOpenDialog(false);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        setOpenDialog(isOpened)
    }, []);

    return (
        <>
            <Dialog open={openDialog} component="form" ref={loginForm} onSubmit={handleLogin}>
                <DialogTitle className='border-bottom mb-3'>
                    Connexion
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
                        autoFocus 
                        // required 
                        fullWidth
                        margin="dense"
                        id="subscription-email"
                        label="Email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        variant="standard"
                        onChange={handleChange}
                    />
                    <FormControl fullWidth required variant="standard" margin='dense'>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            value={loginData.password}
                            name='password'
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type='submit'>Se connecter</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default LoginDialog;