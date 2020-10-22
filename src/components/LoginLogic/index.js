import React from "react";
import AccountChooser from "../AccountChooser/AccountChooser.lazy";
import PasswordScreen from "../PasswordScreen/PasswordScreen.lazy";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie';
import AutoRedirectScreen from "../AutoRedirectScreen/AutoRedirectScreen";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import DeviceVerifyComponent from "../DeviceVerifiyComponent/DeviceVerifiyComponent.lazy";
import {AccountVerificationContext} from "../../contexts/Contexts";
import withRouter from "react-router-dom/es/withRouter";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>{children}</Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const LoginLogic = (props) => {
    const mainElement = document.getElementById('DataContainer');
    if (!mainElement) throw new Error('"MainElement" Not Defined');
    const AppData = {
        PromptType: mainElement.getAttribute('promptType'),
    };
    // parseInt(getQueryParam("s", window.location.href)) ||
    const [value, setValue] = React.useState(0);
    const [account, setAccount] = React.useContext(AccountVerificationContext);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const Accounts = localStorage.getItem('accounts') === null ? null : JSON.parse(localStorage.getItem('accounts'));

    const errorPage = (m = 'Invalid Authentication Parameters', d = <div>Please Contact Site Owner if Problem Persists.
        If you are owner of this site Please Add Required Parameters for <code>response_type=token</code></div>) => (
        <div>
            <Container component="main" className={'pb-2'} maxWidth="xs">
                <div className={'errorPage text-center'}
                     style={{
                         position: 'absolute',
                         top: '40%',
                         left: '50%',
                         width: '90vw',
                         transform: 'translate(-50%, -50%)'
                     }}>
                    <div className={'mb-3 d-inline-flex justify-content-center'}>
                        <Avatar src={'https://cdn.worldvectorlogo.com/logos/google-domains.svg'}
                                alt={'Kabeers Network Logo'}/>
                    </div>
                    <br/>
                    <div>
                        <Typography variant={"body1"} className={'mb-3'}>
                            {m}
                        </Typography>
                        <Typography variant={"caption"}>
                            {d}
                        </Typography>
                    </div>
                </div>
            </Container>
        </div>
    );

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const ChildrenComponents = () => {
        switch (AppData.PromptType) {
            case 'chooser':
                return Accounts && Accounts.length ?
                    <AccountChooser {...props} handleDeviceVerification={handleChange}/> :
                    <PasswordScreen {...props} handleDeviceVerification={handleChange}/>;
            case 'password':
                return <PasswordScreen {...props} handleDeviceVerification={handleChange}/>;
            case 'consent':
                return Accounts && Accounts.length ?
                    <AccountChooser {...props} handleDeviceVerification={handleChange}/> :
                    <PasswordScreen {...props} handleDeviceVerification={handleChange}/>;
            case 'none':
                if (Cookies.get('default_account')) return <AutoRedirectScreen
                    handleDeviceVerification={handleChange} {...props}/>;
                else return Accounts && Accounts.length ?
                    <AccountChooser {...props} handleDeviceVerification={handleChange}/> :
                    <PasswordScreen {...props} handleDeviceVerification={handleChange}/>;
            default:
                return <React.Fragment>
                    {errorPage('Invalid Auth Request', <div>
                        Try Clearing Accounts And Signing in Again
                        <br/>
                        <Button onClick={() => {
                            localStorage.removeItem('accounts');
                            window.location.reload()
                        }}>
                            Clear
                        </Button>
                    </div>)}
                </React.Fragment>;
        }
    };
    // React.useEffect(() => {
    //     if (account) setServerSideState({id: generateRandomHash(20), state: (account)}).then(console.log);
    // }, [account]);
    //
    // if (props.history.location.pathname === "/auth/continue" && parseQuery(props.history.location.search).id && !account) return getServerSideState().then(state => {
    //     if (state.id === parseQuery(props.history.location.search).id) {
    //         setAccount(state);
    //         props.callNext();
    //     } else return <React.Fragment>{errorPage("Session Expired")}</React.Fragment>;
    // }).catch(e => <React.Fragment>{errorPage("Session Expired")}</React.Fragment>);

    return (
        <React.Fragment>
            <Tabs onChange={handleChange} value={value}/>
            <TabPanel index={0} value={value}>
                {ChildrenComponents()}
            </TabPanel>
            <TabPanel index={1} value={value}>
                <DeviceVerifyComponent {...props}/>
            </TabPanel>
        </React.Fragment>
    );
};
export default withRouter(LoginLogic);
