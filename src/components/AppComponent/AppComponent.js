import React from 'react';
import "./AppComponent.css";
import {Route} from "react-router-dom";
import HomeComponent from "../HomeComponent/HomeComponent.lazy";
import OauthAppComponent from "../OauthAppComponent/OauthAppComponent.lazy";
import AccountDataComponent from "../AccountDataComponent/AccountDataComponent.lazy";
import {endPoints} from "../../api/endPoints";
import {AccountVerificationContext} from "../../contexts/Contexts";
import {cookies} from "../../functions/Misc/Misc";
import Settings from "../Settings/Settings.lazy";

const oauthRedirect = () => {
    window.location.href = endPoints.StartInternalOauthFlow;

};
const AppComponent = () => {
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    React.useEffect(() => {
        setAccount(JSON.parse(cookies.getCookie("default_account")));
        //getSavedAccounts().then(accounts => setAccount(accounts[0]));
    }, []);
    return (
        <React.Fragment>
            {
                account ? // This Will Not Be ! TODO
                    (<React.Fragment>
                        <Route path={['/home', '/']} exact component={HomeComponent}/>
                        <Route path={'/apps'} component={OauthAppComponent}/>
                        <Route path={'/profile'} component={AccountDataComponent}/>
                        <Route path={'/settings'} component={Settings}/>
                    </React.Fragment>) : null
            }
        </React.Fragment>
    );
};

AppComponent.propTypes = {};

AppComponent.defaultProps = {};

export default AppComponent;
