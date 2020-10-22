import React from 'react';
import PropTypes from 'prop-types';
import './AppBarComponent.css';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import LinearProgress from "@material-ui/core/LinearProgress";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {AccountCircle, Home, MeetingRoom} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    appbar_root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    appbar_input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    appbar_iconButton: {
        padding: 10,
    },
    appbar_divider: {
        height: 28,
        margin: 4,
    },
}));
const AppBarComponent = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState("recents");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function HideOnScroll(props) {
        const {children, window} = props;
        const trigger = useScrollTrigger({target: window ? window() : undefined});
        return (
            <Slide appear={false} direction="up" in={!trigger}>
                {children}
            </Slide>
        );
    }

    HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        window: PropTypes.func,
    };
    return (
        <div className="AppBarComponent">
            <AppBar color="primary" style={{position: "fixed", top: "auto", bottom: 0, width: "100%",}}
                    component={"div"}>
                <div style={{zIndex: "99999"}} hidden={true} className={"fixed-top"}>
                    <LinearProgress/>
                </div>
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction style={{textDecoration: "none"}} component={Link} to={"/home"} label="Home"
                                            value="recents" icon={<Home/>}/>
                    <BottomNavigationAction style={{textDecoration: "none"}} component={Link} to={"/profile"}
                                            label="Account" value="downloads"
                                            icon={<AccountCircle/>}/>
                    <BottomNavigationAction style={{textDecoration: "none"}} component={Link} to={"/apps"}
                                            label="Apps" value="history"
                                            icon={<MeetingRoom/>}/>
                </BottomNavigation>
            </AppBar>
        </div>
    );
};

AppBarComponent.propTypes = {};

AppBarComponent.defaultProps = {};

export default AppBarComponent;
/*
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}

 */
/*
            <AppBar position={"sticky"} className={"bg-transparent px-3 py-3"} elevation={0} >
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search Google Maps"
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon/>
                </IconButton>
            </Paper>
            </AppBar>

 */
