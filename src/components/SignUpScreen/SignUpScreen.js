import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {endPoints} from "../../api/endPoints";
import {getFormData} from "../../functions/Misc/Misc";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpScreen() {
    const classes = useStyles();
    const [text, setText] = React.useState({
        lastname: '',
        firstname: '',
        email: '',
        username: '',
        password: '',
        username_error: false,
        password_error: false,
    });
    const [authComplete, setAuthComplete] = React.useState();
    const handleSubmit = () => {
        fetch(endPoints.CreateAccount, {
            method: "POST",
            timeout: 0,
            headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
            body: getFormData(text)
        })
            .then(res => res.json())
            .then(value => setAuthComplete(<div>Authentication Complete <Link
                href={`/auth/user/verify/${value.token}`}>Verify</Link> account
                here!</div>))
            .catch(e => console.log(e))
    };
    return (
        <Container component="main" maxWidth="xs">
            <Dialog
                open={!!authComplete}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Sign up Complete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>
                            {authComplete}
                        </Typography>
                        <Typography variant={"caption"}>
                            You cannot do this again
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="filled"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        firstname: event.target.value
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        lastname: event.target.value
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        username: event.target.value
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        email: event.target.value
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        password: event.target.value
                                    }))
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={endPoints.StartInternalOauthFlow + '?prompt=password'} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
