import React, {useEffect} from 'react';
import './PermessionsScreen.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {AuthAllow} from "../../functions/Login/Login";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MainElement} from "../../functions/Misc/Misc";
import {AccountVerificationContext} from "../../contexts/Contexts";
import Slide from "@material-ui/core/Slide";

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
        marginTop: theme.spacing(8),
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
const PermessionsScreen = (props) => {
    const classes = useStyles();
    const abortController = new AbortController();
    if (!MainElement) return new Error('Main Element Not Defined');
    const AppData = {
        appName: MainElement.getAttribute('appName'),
        appIcon: MainElement.getAttribute('appIcon'),
        appPerms: JSON.parse(atob(MainElement.getAttribute('appPerms'))),
    };
    const [open, setOpen] = React.useState(false);
    const [account, setAccount] = React.useContext(AccountVerificationContext);

    const LoginHelper = () => {
        setOpen(!open);
        AuthAllow(account).catch(() => setOpen(false));
        //Login(account).catch(e => setOpen(false));
    };
    useEffect(() => {
        document.title = `Allow ${MainElement.getAttribute('appName')} to access your data`;
        return () => abortController.abort()
    }, []);

    return (
        <div className="PermessionsScreen">
            <Container component="main" maxWidth="xs" className={'mt-5 pt-2 pb-2'}>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Slide in={true} direction={"left"}>
                    <Card className={classes.main}>
                        <CardContent className={classes.alignCenter}>
                            <Avatar src={AppData.appIcon} className={classes.avatar}/>
                            <Typography className={'text-center'}>
                                <Typography component={"span"} className={"mr-1"} color={"secondary"}>
                                    {AppData.appName}
                                </Typography>
                                wants Access to Your Account
                                <br/>
                                <Typography variant={"caption"} className={'d-inline-flex'}>
                                    <Avatar style={{width: '1rem', height: '1rem', marginRight: '0.5rem'}}
                                            alt={account.username}
                                            src={account.account_image}/>
                                    {account.email}
                                </Typography>
                            </Typography>
                            <Typography variant={"overline"} component={'div'} className={"text-left mt-3"}>
                                This allows
                                <Typography className={"ml-1"} variant={"overline"} color={"secondary"}>
                                    {AppData.appName}
                                </Typography> To:
                            </Typography>
                            <List className={`${classes.root} mt-3`}>
                                {
                                    AppData.appPerms.map((perm, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem style={{minWidth: '100%'}} button alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={perm.title} src={perm.image}
                                                            style={{width: '2rem', height: '2rem'}}
                                                            className={'bg-light'} variant={"rounded"}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${perm.desc}`}
                                                    secondary={perm.title}
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li"/>
                                        </React.Fragment>
                                    ))
                                }
                            </List>
                            <div className={"TrustComponent mt-3 px-2"}>
                                <Typography variant={"button"}>
                                    Make sure you trust {AppData.appName}
                                </Typography>
                                <Typography variant={"body2"}>
                                    You may be sharing sensitive info with this site or app. Learn about
                                    how {AppData.appName}
                                    will handle your data by reviewing its terms of service and privacy
                                    policies. You can always see or remove access in your Kabeers Network Account.
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions className={'mb-5'}>
                            <Button
                                onClick={() => AuthAllow(account, false).then(s => window.location.href = s["redirect_uri"])}
                                color="secondary"
                                className={'mx-2'}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={'mx-2'}
                                onClick={LoginHelper}>
                                Allow
                            </Button>
                        </CardActions>
                    </Card>
                </Slide>
            </Container>
        </div>
    );
};

PermessionsScreen.propTypes = {};

PermessionsScreen.defaultProps = {};

export default React.memo(PermessionsScreen);
