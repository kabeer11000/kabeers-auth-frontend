import React, {useEffect} from 'react';
import './OauthAppComponent.css';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {ArrowForward} from "@material-ui/icons";
import {endPoints} from "../../api/endPoints";
import Cookies from "js-cookie";
import OauthAppDetailsRaw from "./OauthAppDetails";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
const OauthAppComponent = () => {
    const [apps, setApps] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [appId, setAppId] = React.useState('');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            //setValue(newValue);
        }
    };

    const classes = useStyles();
    useEffect(() => {
        fetch(endPoints.getUserApps, {
            method: 'POST',
            headers: new Headers({
                "default_account": Cookies.get("default_account")
            })
        })
            .then(res => res.json())
            .then(auth_apps => setApps(auth_apps))
            .catch(e => alert(JSON.stringify(e)))
    }, []);
    return (
        <div className="OauthAppComponent">
            <OauthAppDetailsRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                appId={appId}
                data={apps}
            />

            <div className={'a'}>
                <Container className={"mt-5 mb-4"} maxWidth={"xs"}>
                    <Typography variant={"h3"}>
                        Apps
                    </Typography>
                    <Typography variant={"caption"}>
                        Apps Connected to Your Account.
                        OAuth2.0 apps you have signed up with your account
                    </Typography>
                </Container>
                <Container maxWidth={"xs"}>
                    <Card>
                        <List className={classes.root}>
                            {
                                apps ? (
                                    apps.map((app, index) => (
                                        <React.Fragment>
                                            <ListItem key={index} button
                                                      onClick={() => (setAppId(app.appId), handleClickListItem())}>
                                                <ListItemAvatar>
                                                    <Avatar src={app.icon} alt={app.appName}/>
                                                </ListItemAvatar>
                                                <ListItemText primary={app.appName}/>
                                                <ArrowForward/>
                                            </ListItem>
                                        </React.Fragment>
                                    ))
                                ) : null
                            }
                        </List>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

OauthAppComponent.propTypes = {};

OauthAppComponent.defaultProps = {};

export default OauthAppComponent;
