import React from 'react';
import './Settings.css';
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {AccountVerificationContext} from "../../contexts/Contexts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {ArrowBack, PhonelinkLock, VerifiedUser} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Button} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
//import {useSnackbar} from "notistack";

const Settings = (props) => {
    //const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    const [state, setState] = React.useState({
        DevicesDialog: false
    });
    return (
        <div className="Settings">
            <AppBar>
                <Toolbar>
                    <IconButton>
                        <ArrowBack/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <List className={"text-left"} style={{marginTop: "5rem"}}>
                <div style={{display: "inline-flex", justifyContent: "center"}} className={"w-100"}>
                    <Avatar alt={account.username}
                            src={account.account_image}/>
                </div>
                <div className={"text-center"}>
                    <ListItemText id="switch-list-label-wifi"
                                  primary={`Welcome ${account.username}`}/>
                </div>
                <Divider/>
                <ListItem button onClick={() => {
                    setState({...state, DevicesDialog: !state.DevicesDialog});
                }}>
                    <ListItemIcon>
                        <VerifiedUser/>
                    </ListItemIcon>
                    <ListItemText primary={"Verified Devices"}
                                  secondary={"Devices Verified and Connected to your Account"}/></ListItem>
                <Divider/>
                <ListItem button onClick={() => alert("Feature Not Implemented Yet")}>
                    <ListItemIcon>
                        <PhonelinkLock/>
                    </ListItemIcon>
                    <ListItemText primary={"2 Factor Authentication"}
                                  secondary={"Enable 2 Factor Auth"}/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <Switch/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Dialog onClose={() => setState({...state, DevicesDialog: !state.DevicesDialog})}
                    open={state.DevicesDialog}>
                <DialogTitle id="confirmation-dialog-title">Verified Devices</DialogTitle>
                <DialogContent dividers={false}>
                    {
                        account.webauthn_devices.map(id => (
                            <ListItem button>
                                <ListItemIcon>
                                    <VerifiedUser/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography noWrap className={"text-truncate"}>
                                        {id}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setState({...state, DevicesDialog: !state.DevicesDialog})}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
