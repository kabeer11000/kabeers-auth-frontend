import React from 'react';
import './DeviceVerifiyComponent.css';
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import {VerifiedUser} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {pure} from "recompose";
import Slide from "@material-ui/core/Slide";
import {AccountVerificationContext} from "../../contexts/Contexts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {Devices} from "../../functions/Login/Login";
import FormControl from "@material-ui/core/FormControl";
import {AddToAccounts} from "../../functions/Login/AddToAccounts";
import {MainElement} from "../../functions/Misc/Misc";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(6),
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
const DeviceVerifyComponent = (props) => {
    const classes = useStyles();
    const [text, setText] = React.useState({verification_code: ''});
    const [open, setOpen] = React.useState(false);
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    const verifyCode = () => (setOpen(true), FingerprintJS.load()
        .then(fp => fp.get()
            .then(details => Devices.sendUpdateRequest(account, text.verification_code, details.visitorId)
                .then(value => value.ok ? value.json()
                    .then((value) => AddToAccounts(value)
                        .then(() => {
                            setAccount(value);
                            setOpen(false);
                            props.callNext();
                        })) : null)
                .catch(e => alert("Failed")))
            .catch(e => alert("Failed")))
        .catch(e => alert("Failed")));
    React.useEffect(() => {
        document.title = `Verify Device to Sign in. Continue to ${MainElement.getAttribute('appName')}`;
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
                            <VerifiedUser/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Verify Device to Login
                        </Typography>
                        <Typography variant={"body2"} className={"text-center mt-1"}>
                            A Verification Code has been sent to {account.email}
                        </Typography>
                        <FormControl className={classes.form}>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required={true}
                                error={text.username_error}
                                fullWidth={true}
                                id="verification_code"
                                label="Code ex. 555 666"
                                name="verification_code"
                                autoComplete="code"
                                autoFocus
                                inputProps={{maxLength: 6}}
                                onChange={event => {
                                    event.persist();
                                    setText(prevState => ({
                                        ...prevState,
                                        verification_code: event.target.value
                                    }))
                                }}
                            />
                            <Button
                                onClick={verifyCode}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Continue
                            </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Slide>
        </Container>
    );
};

DeviceVerifyComponent.propTypes = {};

DeviceVerifyComponent.defaultProps = {};

export default pure(DeviceVerifyComponent);
