import React from 'react';
import './EmbeddedAccountSystem.css';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {MainElement} from "../../functions/Misc/Misc";
import {AccountVerificationContext} from "../../contexts/Contexts";
import {ChooserLoginTest, Devices, Login} from "../../functions/Login/Login";
import {AddToAccounts} from "../../functions/Login/AddToAccounts";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Divider, Typography} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grow from "@material-ui/core/Grow";
import {DragHandle} from "@material-ui/icons";
import "../../sdk/kauthsdk";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AccountChooser = (props) => {
    const [state, setState] = React.useContext(EmbededAccountContext);
    const Accounts = localStorage.getItem('accounts') === null ? null : JSON.parse(localStorage.getItem('accounts'));
    if (!MainElement) return new Error('Main Element Not Defined');
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    const [open, setOpen] = React.useState(false);

    const LoginHelper = (account) => {
        setOpen(!open);
        ChooserLoginTest(account).then(res => res.json())
            .then(async value => {
                if (value.status === 69) return (setAccount(account), await Devices.sendUpdateEmail(account), props.handleDeviceVerification(1));
                if (value.status !== 200) return alert("unKnown Error Code");
                if (value !== 'Nothing Found') await AddToAccounts(value).then(() => {
                    setAccount(account);
                    props.callNext();
                });
            })
            .catch(e => {
                setOpen(false);
            });
    };
    return (
        <List>
            {
                Accounts.map((account, index) => (
                    <ListItem style={{minWidth: '100%'}} button alignItems="flex-start"
                              onClick={() => {
                                  setState({
                                      ...state,
                                      backdrop: true
                                  });
                                  ChooserLoginTest(account)
                                      .then((d) => d.json().then(d => d.status === 200 && setState({
                                          ...state,
                                          headersSlideIn: !state.headersSlideIn,
                                          accountSelected: true,
                                          account: d,
                                          backdrop: false
                                      })))
                                      .catch(e => setState({
                                          ...state,
                                          headersSlideIn: state.headersSlideIn,
                                          accountSelected: false,
                                          account: null
                                      }))
                                  //props.setHeader();
                              }} key={index}>
                        <ListItemAvatar>
                            <Avatar alt={account.username} src={account.account_image}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={account.username}
                            secondary={account.email}
                        />
                    </ListItem>
                ))
            }
        </List>
    )
}
export const PermsComponent = () => {
    const [state, setState] = React.useContext(EmbededAccountContext);
    return (
        <Container>
            <List>
                <ListItem style={{minWidth: '100%'}} button alignItems="flex-start"
                          onClick={() => {
                              setState({...state, headersSlideIn: !state.headersSlideIn, accountSelected: true})
                              //props.setHeader();
                          }}>
                    <ListItemAvatar>
                        <Avatar alt={state.account.username} src={state.account.account_image}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={state.account.username}
                        secondary={state.account.email}
                    />
                </ListItem>
            </List>
            <Typography className={'text-center'}>
                <Typography component={"span"} className={"mr-1"} color={"secondary"}>
                    {state.app.name}
                </Typography>
                wants Access to Your Account
            </Typography>
            <Typography variant={"overline"} component={'div'} className={"text-left mt-3"}>
                This allows
                <Typography className={"ml-1"} variant={"overline"} color={"secondary"}>
                    {state.app.name}
                </Typography> To:
            </Typography>
            <List className={`mt-3`}>
                {
                    state.app.perms.map((perm, index) => (
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
            <Divider variant={"middle"}/>
            <Button variant={"contained"} className={"w-100 mt-2"} onClick={() => {
                setState({...state, backdrop: !state.backdrop});
                Login(state.account, true)
                    .then((res) => console.warn(res))
                    .catch(e => setState({...state, backdrop: !state.backdrop}));
            }}>
                Allow App
            </Button>
        </Container>
    )
};
export const EmbededAccountContext = React.createContext({
    headersSlideIn: true,
    accountSelected: false
});
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        width: '100%',
    },
}));
const EmbeddedAccountSystem = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        headersSlideIn: true,
        accountSelected: false,
        backdrop: false,
        app: {
            name: MainElement.getAttribute('appName'),
            icon: MainElement.getAttribute('appIcon'),
            perms: JSON.parse(atob(MainElement.getAttribute('appPerms'))),
        }
    });
    return (
        <div className={classes.root}>
            <Backdrop open={state.backdrop} className={classes.backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <EmbededAccountContext.Provider value={[state, setState]}>
                <Paper className="EmbeddedAccountSystem w-100 h-100" style={{
                    position: "fixed",
                    bottom: 0,
                    paddingBottom: "2.5rem",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    overflow: "hidden",
//                overflowY: "scroll",
                    maxHeight: "60vh",
                    height: "100%",
                }} elevation={5}>
                    <div className={"d-flex justify-content-center w-100"}>
                        <DragHandle/>
                    </div>
                    <Slide in={state.headersSlideIn} direction={"bottom"} style={{
                        position: !state.headersSlideIn ? "absolute" : "relative"
                    }}>
                        <div>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={"/kslogo.png"} variant={"rounded"}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={"Sign in with Kabeers Network"}
                                                  secondary={"Sign in to Medium.com with your Kabeers Network Account"}/>
                                </ListItem>
                            </List>
                            <Divider variant={"fullwidth"}/>
                        </div>
                    </Slide>
                    <div className={"h-100 w-100"} style={{
                        overflowY: "scroll",
//                    maxHeight: "30vh",
                    }}>
                        <Grow direction={"left"} in={!state.accountSelected} style={{
                            position: state.accountSelected ? "absolute" : "relative",
                            overflowY: "scroll",
                        }} mountOnEnter unmountOnExit>
                            <div>
                                <AccountChooser
                                    setHeader={() => setState({...state, headersSlideIn: !state.headersSlideIn})}
                                />
                            </div>
                        </Grow>
                        <Grow mountOnEnter unmountOnExit in={state.accountSelected} style={{
                            position: state.accountSelected ? "absolute" : "relative"
                        }}>
                            <div>
                                <PermsComponent/>
                            </div>
                        </Grow>
                    </div>
                </Paper>
            </EmbededAccountContext.Provider>
        </div>
    );
}

EmbeddedAccountSystem.propTypes = {};

EmbeddedAccountSystem.defaultProps = {};

export default EmbeddedAccountSystem;
