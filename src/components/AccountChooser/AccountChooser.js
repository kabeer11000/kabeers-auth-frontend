import React from 'react';
import './AccountChooser.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import {LockOutlined} from "@material-ui/icons";
import {ChooserLoginTest, Devices, GetSessionAccounts} from "../../functions/Login/Login";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {AddToAccounts} from "../../functions/Login/AddToAccounts";
import {MainElement, UpdateQueryStringParam} from "../../functions/Misc/Misc";
import {AccountVerificationContext, ReloginDialogContext} from "../../contexts/Contexts";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import SignedOutDialog from "./SignedOutDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '50ch',
        minWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    inline: {
        display: 'inline',
    },
    main: {
        marginTop: theme.spacing(3),
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const AccountChooser = (props) => {
    const classes = useStyles();
    if (!MainElement) return new Error('Main Element Not Defined');
    const AppData = {
        appName: MainElement.getAttribute('appName'),
    };
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    const [open, setOpen] = React.useState(false);
    const [Accounts, setAccounts] = React.useState(null);
    const [dialog, setDialog] = React.useContext(ReloginDialogContext);
    const [reloginAccount, setReloginAccount] = React.useState({
        account: {},
        open: false
    });

    const LoginHelper = (account) => {
        setOpen(!open);
        ChooserLoginTest(account, true).then(res => res.json())
            .then(async value => {
                if (value.status === 69) return (setAccount(account), await Devices.sendUpdateEmail(account), props.handleDeviceVerification(1));
                if (value.status !== 200) return alert("unKnown Error Code");
                if (value !== 'Nothing Found') await AddToAccounts(value).then(() => {
                    setAccount(value);
                    props.callNext();
                });
            })
            .catch(e => {
                setOpen(false);
            });
    };
    const HandleSignedOutLogin = (account) => {
        if (!account) return setDialog({
            invalidPassword: false,
            account: {},
            open: false,
            loading: false
        });
        setDialog({
            ...dialog,
            loading: true
        });
        ChooserLoginTest(account).then(r => r.ok ? r.json() : null).then((a) => {
            if (!a) return setDialog({
                account: account,
                open: true,
                invalidPassword: true
            });
            setDialog({
                account: {},
                open: false,
                invalidPassword: false
            });
            console.log(a);
            LoginHelper(a);
        });

    }
    React.useEffect(() => {
        document.title = `Sign in to continue to ${MainElement.getAttribute('appName')}. Choose an Account`;
        GetSessionAccounts().then(a => {
            setAccounts(a);
        });
    }, []);
    return (
        <div className={`AccountChooser`}>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Container component="main" className={'mt-5 pt-2 pb-2'} maxWidth="xs">
                <Slide in={true} direction={"left"}>
                    <Card className={classes.main}>
                        <CardContent className={classes.alignCenter}>
                            <Avatar className={classes.avatar}>
                                <LockOutlined/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Choose An Account
                            </Typography>
                            <Typography variant={"overline"} className={"text-center"}>
                                Continue to
                                <Typography className={"ml-1"} variant={"overline"} color={"secondary"}>
                                    {AppData.appName}
                                </Typography>
                            </Typography>
                            <Grow in={!!Accounts} unmountOnExit={true} mountOnEnter={true}>
                                <List className={classes.root}>
                                    {
                                        Accounts ? Accounts.map((account, index) => (
                                            <React.Fragment key={index}>
                                                <ListItem style={{minWidth: '100%'}} button alignItems="flex-start"
                                                          onClick={() => !account.signed_in ? setDialog({
                                                              account: account,
                                                              open: true,
                                                              invalidPassword: false
                                                          }) : LoginHelper(account)}>
                                                    <ListItemAvatar>
                                                        <Avatar alt={account.username} src={account.account_image}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={account.username}
                                                        secondary={account.email}
                                                    />
                                                    <ListItemSecondaryAction style={{
                                                        paddingBottom: "1.2rem"
                                                    }}>
                                                        {!account.signed_in && <ListItemText secondary={"Signed Out"}/>}
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <Divider variant="inset" component="li"/>
                                            </React.Fragment>
                                        )) : null
                                    }
                                    <ListItem alignItems="center" className={"text-center mt-2"}>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Button className={"w-100"}
                                                            onClick={() => window.location.href = UpdateQueryStringParam(window.location.href, 'prompt', 'password')}>
                                                        Add New Account
                                                    </Button>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Grow>
                        </CardContent>
                    </Card>
                </Slide>
            </Container>
            <SignedOutDialog onClose={HandleSignedOutLogin}/>
        </div>
    );
};

AccountChooser.propTypes = {
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
};

AccountChooser.defaultProps = {};

export default AccountChooser;
