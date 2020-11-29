import React, {useEffect} from 'react';
import './AutoRedirectScreen.css';
import Preloader from "../Preloader/Preloader";
import {AuthAllow, ChooserLoginTest, Devices, GetSessionAccounts} from "../../functions/Login/Login";
import Typography from "@material-ui/core/Typography";
import {MainElement} from "../../functions/Misc/Misc";
import {AddToAccounts} from "../../functions/Login/AddToAccounts";
import {AccountVerificationContext} from "../../contexts/Contexts";
import {pure} from "recompose";

const AutoRedirectScreen = (props) => {

    const [errorDesc, setErrorDesc] = React.useState();
    const [account, setAccount] = React.useContext(AccountVerificationContext);

    useEffect(() => {
        GetSessionAccounts(true).then(async defaultAccount => {
            ChooserLoginTest(defaultAccount, true).then(res => res.json())
                .then(async value => {
                    if (value.status === 69) return (setAccount(defaultAccount), await Devices.sendUpdateEmail(defaultAccount), props.handleDeviceVerification(1));
                    if (value.status !== 200) return setErrorDesc(<div>This Kabeers Auth Session Faced Internal Server
                        Error</div>);
                    if (value !== 'Nothing Found') await AddToAccounts(value).then(() => AuthAllow(value).catch(e => setErrorDesc(
                        <div>This Kabeers Auth Session Faced Internal Server Error</div>)));
                })
                .catch(e => setErrorDesc(<div>This Kabeers Auth Session Faced Internal Server Error</div>));
        })
    }, []);
    document.title = `Redirecting you to ${MainElement.getAttribute('appName')}. Please wait...`;
    return (
        <div className="AutoRedirectScreen">
            <Preloader/>
            <div style={{
                marginTop: "30%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <br/>
                <Typography variant={"caption"}>
                    Redirecting You to <b>{MainElement.getAttribute('appName')}</b>
                </Typography>
                {
                    errorDesc
                }
            </div>
        </div>
    );
};

AutoRedirectScreen.propTypes = {};

AutoRedirectScreen.defaultProps = {};

export default pure(AutoRedirectScreen);
/*
<div id="DataContainer"
     prompttype="{{promptType}}"
     appname="{{appName}}"
     clientpublic="{{clientPublic}}"
     authcode="{{authCode}}"
     appperms="{{appPerms}}"
     appicon="{{appIcon}}"
     account="{{account}}">
</div>

 */
