import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {getQueryParam} from "./functions/Misc/Misc";
import StepperBase from "./components/StepperBase/StepperBase.lazy";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import AppBarComponent from "./components/AppBarComponent/AppBarComponent.lazy";
import SignUpScreen from "./components/SignUpScreen/SignUpScreen.lazy";
import {AccountVerificationProvider} from "./contexts/Contexts";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppComponent from "./components/AppComponent/AppComponent.lazy";


const App = () => {

    const [error, setError] = React.useState(false);
    const [errorDesc, setErrorDesc] = React.useState(<div>Please Contact Site Owner if Problem Persists.
        If you are owner of this site Please Add Required Parameters for <code>response_type=token</code></div>);
    const [darkState, setDarkState] = React.useState(true);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
        }
    });
    const handleThemeChange = () => {
        setDarkState(!darkState);
    };
    const errorPage = (m = 'Invalid Authentication Parameters', d = errorDesc) => (
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
    useEffect(() => {
        if (getQueryParam('response_type') === 'token' && getQueryParam('client_secret') === null || '' || undefined) return setError(true);
    }, []);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>
                <AccountVerificationProvider>
                    <Route path={['/auth/authorize', /* "/auth/continue" */]} component={StepperBase}/>
                    <Route path={'/create-account'} component={SignUpScreen}/>
                    <Route exact path={['/home', '/', '/apps', '/profile']}>
                        <AppBarComponent/>
                    </Route>
                    <Route exact path={['/home', '/', '/apps', '/profile', '/settings']}>
                        <React.Fragment>
                            <AppComponent/>
                        </React.Fragment>
                    </Route>
                </AccountVerificationProvider>
            </Router>
        </ThemeProvider>
    );
};
export default App;
