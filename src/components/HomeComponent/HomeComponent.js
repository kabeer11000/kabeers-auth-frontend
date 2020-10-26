import React from 'react';
import './HomeComponent.css';
import Grow from "@material-ui/core/Grow";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {pure} from "recompose";
import {AccountVerificationContext} from "../../contexts/Contexts";

const HomeComponent = () => {
    const [account, setAccount] = React.useContext(AccountVerificationContext);
    return (
        <div className="HomeComponent">
            <Grow in={true}>
                <div className="PermessionsScreen">
                    <Container component="main" maxWidth="xs" className={'mt-5 pt-2 pb-2'}>
                        <div className={'d-flex justify-content-center mb-2'}>
                            <Avatar style={{width: '5rem', height: '5rem'}} src={account.account_image}
                                    alt={account.username}/>
                        </div>
                        <div className={'d-flex justify-content-center text-center'}>
                            <Typography variant={"h5"}>
                                Welcome, {account.username}
                            </Typography>
                        </div>
                        <div className={'d-flex justify-content-center text-center'}>
                            <Typography variant={"caption"}>
                                Manage your info, privacy, and security to make Kabeers Network work better for you.
                            </Typography>
                        </div>
                    </Container>
                </div>
            </Grow>
        </div>
    );
};

HomeComponent.propTypes = {};

HomeComponent.defaultProps = {};

export default pure(HomeComponent);
