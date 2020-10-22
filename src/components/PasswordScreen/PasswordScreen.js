import React from 'react';
import './PasswordScreen.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import {LockOutlined} from "@material-ui/icons"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {ChooserLoginTest, Devices} from "../../functions/Login/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MainElement} from "../../functions/Misc/Misc";
import {AddToAccounts} from "../../functions/Login/AddToAccounts";
import {AccountVerificationContext} from "../../contexts/Contexts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '100%',
        width: '100%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}));

const PasswordScreen = (props) => {
    const classes = useStyles();
    const [text, setText] = React.useState({username: '', password: '', username_error: false, password_error: false,});
    const [open, setOpen] = React.useState(false);
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    const handleToggle = () => {
        setOpen(!open);
    };
    const AppData = {
        appName: MainElement.getAttribute('appName'),
    };

    const LoginHelper = () => {
        handleToggle();
        ChooserLoginTest(text)
            .then(value => value.ok ? (value.json().then(async (value) => {
                if (value.status === 69) return (setAccount(text), await Devices.sendUpdateEmail(text), props.handleDeviceVerification(1));
                if (value.status !== 200) return alert("unKnown Error Code");
                await AddToAccounts(value);
                return (setAccount(value), props.callNext())
            })) : null)
            .catch(e => (handleToggle(), alert("An Error Occured")))
    };
    React.useEffect(() => {
        document.title = `Sign in to continue to ${MainElement.getAttribute('appName')}`;
    }, []);

    return (
        <Container component="main" maxWidth="xs" className={'mt5 pt-5'}>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Slide in={true} direction={"left"}>
                <Card className={classes.paper}>
                    <CardContent className={classes.alignCenter}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Typography variant={"body1"}>
                            Continue to {AppData.appName}
                        </Typography>
                        <div className={classes.form}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                error={text.username_error}
                                fullWidth
                                id="username"
                                label="Email or Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        username: event.target.value
                                    }))
                                }}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                error={text.password_error}
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
                            <Button
                                onClick={LoginHelper}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/create-account" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
            </Slide>
        </Container>
    );
};
PasswordScreen.propTypes = {};

PasswordScreen.defaultProps = {};

export default PasswordScreen;
