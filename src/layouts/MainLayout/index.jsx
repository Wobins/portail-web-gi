import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    InputLabel,
    Input,
    FormControl,
    InputAdornment,
    TextField,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Avatar,
    Tooltip,
    Menu,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright';
import SubscriptionDialog from '../../components/SubscriptionDialog';
import { listItems } from '../../utils/listItems';
import drawer from '../../utils/Drawer';
import appBar from '../../utils/AppBar';

const loggedOutOptions = ['Connexion'];
const loggedInOptions = ['Parametres', 'Se deconnecter'];


const MainLayout = (props) => {
    const {component} = props; 
    const Drawer = drawer;
    const AppBar = appBar;
    const mdTheme = createTheme();
    const [open, setOpen] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [admin, setAdmin] = React.useState(null);


    const LoginDialog = () => {
        const loginForm = React.useRef();
        const [openDialog, setOpenDialog] = React.useState(true);
        const [loginData, setLoginData] = React.useState({email: "", password: ""});
        const [showPassword, setShowPassword] = React.useState(false);
    
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
            setOpenDialog(false);
        };
        const handleCloseDialog = () => {
            setOpenDialog(false);
            setLoginData({email: "", password: ""});
            setShowLogin(false);
        };
    
    
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
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}
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
                        <Button onClick={handleCloseDialog} color='error' variant='outlined' size='small'>Annuler</Button>
                        <Button type='submit' variant='contained' size='small'>Se connecter</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    // Function to check if a user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setAdmin(user);
        } catch (error) {
            console.log('No user logged in');
        }
    };
    
    // Function to log out user
    const signOut = async () => {
        try {
            await Auth.signOut();
            setAdmin(null);
        } catch (error) {
          console.log('error signing out: ', error);
        }
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleShowLoginForm = () => {
        setShowLogin(true);
        setAnchorElUser(null); 
    }

    React.useEffect(() => {
        checkUserLoggedIn();
    }, [showLogin]);

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                            pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                <Link to={`/`} className='text-white' style={{textDecoration: 'none'}}>
                                    Portail GI
                                </Link>
                            </Typography>
                            <Tooltip title="Profil">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {
                                        admin ? 
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> 
                                            : <Avatar src="/broken-image.jpg" />
                                    }
                                    
                                </IconButton>
                            </Tooltip>
                            {
                                admin ? 
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {/* {loggedInOptions.map((setting) => (
                                            <MenuItem key={setting} onClick={signOut}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))} */}
                                        <MenuItem  onClick={signOut}>
                                            <Typography textAlign="center">Déconnexion</Typography>
                                        </MenuItem>
                                    </Menu>
                                : 
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {loggedOutOptions.map((setting) => (
                                            <MenuItem key={setting} onClick={handleShowLoginForm}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>

                            }
                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {listItems}
                        </List>
                    </Drawer>

                    <Box
                        component="main"
                        sx={{
                        //     backgroundColor: (theme) =>
                        //     theme.palette.mode === 'light'
                        //         ? theme.palette.grey[100]
                        //         : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{flex: 1}}>
                            <SubscriptionDialog />
                            {showLogin && <LoginDialog />}
                            { component }
                        </Container>
                        <Copyright sx={{ pt: 4 }} />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default MainLayout;











