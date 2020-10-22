import React, {useEffect} from 'react';
import './AccountDataComponent.css';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Cookies from "js-cookie";
import Avatar from "@material-ui/core/Avatar";
import Preloader from "../Preloader/Preloader.lazy";
import {ChooserLoginTest} from "../../functions/Login/Login";

const useStyles = makeStyles({
    table: {
        minWidth: '100%',
        width: '100%'
    },
});

function createData(name, calories) {
    return {name, calories};
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
];
const AccountDataComponent = () => {
    const AppData = {
        account: Cookies.get('default_account') ? JSON.parse(Cookies.get('default_account')) : null,
    };
    const [accountState, setAccountState] = React.useState({});
    useEffect(() => {
        ChooserLoginTest({
            username: AppData.account.username,
            password: AppData.account.password,
        })
            .then(value => value.json())
            .then(value => setAccountState({
                Username: value.username,
                Email: value.email,
                Avatar: <Avatar src={value.account_image} alt={'Account Image'}/>,
                city: value.city,
                region: value.region,
                country: value.country,
                postal: value.postal,
                time_Zone: value.time_zone,
                date: value.date,
                location: `${value.location.x}, ${value.location.y}`
            }))


    }, []);
    const classes = useStyles();
    return (
        <div className="AccountDataComponent mb-3">
            <Container className={"mt-5 mb-4"} maxWidth={"xs"}>
                <Typography variant={"h3"}>
                    Profile
                </Typography>
                <Typography variant={"caption"}>
                    View your account Details.
                    Your Kabeers Network Account Profile
                </Typography>
            </Container>
            <Container maxWidth={"xs"}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow/>
                        </TableHead>
                        <TableBody>
                            {
                                Object.keys(accountState).length ? Object.keys(accountState).map((key, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={"text-capitalize"} component="th" scope="row">
                                            {key.replace('_', ' ')}
                                        </TableCell>
                                        <TableCell align="left"
                                                   className={"text-truncate"}>{accountState[key]}</TableCell>
                                    </TableRow>
                                )) : <Preloader/>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};

AccountDataComponent.propTypes = {};

AccountDataComponent.defaultProps = {};

export default AccountDataComponent;
