import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from "@material-ui/core/DialogContentText";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {Divider} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {ArrowBack} from "@material-ui/icons";
import {endPoints} from "../../api/endPoints";
import Cookies from "js-cookie";

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function OauthAppDetailsRaw(props) {
    const {onClose, value: valueProp, open, ...other} = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const mainData = props.data.find(app => app.appId === props.appId);
    const AppData = {
        account: Cookies.get('default_account') ? JSON.parse(Cookies.get('default_account')) : null,
    };
    const handleAppRemove = () => {
        fetch(endPoints.removeOauthApp, {
            method: 'POST',
            headers: new Headers({
                'default_account': AppData.account,
                'app_id': mainData.appId
            })
        }).then(handleCancel)
    };
    return (
        <React.Fragment>
            {open && props.data && mainData ? (
                <Dialog
                    keepMounted
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleCancel}
                    onEntering={handleEntering}
                    aria-labelledby="responsive-dialog-title"
                    TransitionComponent={Transition}
                    {...other}
                    maxWidth="xs"
                >
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton onClick={handleCancel} edge="start" color="inherit" aria-label="menu">
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6">
                                {mainData.appName}
                            </Typography>
                            <div className={'flexGrow'}/>
                            <Avatar src={mainData.icon} alt={mainData.appName} variant={"rounded"}/>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <DialogContentText>
                            {
                                props.data ? (
                                    props.data.find(app => app.appId === props.appId).perms.map((app, index) => (
                                        <React.Fragment>
                                            <ListItem button>
                                                <ListItemAvatar>
                                                    <Avatar src={app.icon} alt={app.title}/>
                                                </ListItemAvatar>
                                                <ListItemText primary={app.title}/>
                                            </ListItem>
                                            <Divider variant={"inset"}/>
                                        </React.Fragment>
                                    ))) : null
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary" autoFocus>
                            Remove
                        </Button>
                    </DialogActions>
                </Dialog>) : null}
        </React.Fragment>
    );
}

OauthAppDetailsRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    appId: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));
export default OauthAppDetailsRaw;
/*
export default function OauthAppDetails() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <List component="div" role="list">
                <ListItem button divider disabled role="listitem">
                    <ListItemText primary="Interruptions" />
                </ListItem>
                <ListItem
                    button
                    divider
                    aria-haspopup="true"
                    aria-controls="ringtone-menu"
                    aria-label="phone ringtone"
                    onClick={handleClickListItem}
                    role="listitem"
                >
                    <ListItemText primary="Phone ringtone" secondary={value} />
                </ListItem>
                <ListItem button divider disabled role="listitem">
                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                </ListItem>
                <OauthAppDetailsRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    value={value}
                />
            </List>
        </div>
    );
}
OauthAppDetails.propTypes = {};

OauthAppDetails.defaultProps = {};

export default OauthAppDetails;
*/
