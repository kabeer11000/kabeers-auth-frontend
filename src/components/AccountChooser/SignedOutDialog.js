import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import {ReloginDialogContext} from "../../contexts/Contexts";
import FormControl from "@material-ui/core/FormControl";
import {FormHelperText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignedOutDialog = (props) => {
    const [dialog, setDialog] = React.useContext(ReloginDialogContext);
    return (
        <div>
            <Dialog open={dialog.open} onClose={() => props.onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <ListItem className={"text-truncate p-0 m-0"}>
                        <ListItemAvatar>
                            <Avatar src={dialog.account.account_image}/>
                        </ListItemAvatar>
                        <ListItemText primary={<div className={"text-truncate"}>{dialog.account.username || ""}</div>}
                                      secondary={<div className={"text-truncate"}>{dialog.account.email || ""}</div>}/>
                    </ListItem>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div in={!dialog.loading}>
                            <div>
                                <DialogContentText>
                                    You were signed out of your account. type your password to login again.
                                </DialogContentText>
                                <FormControl error={dialog.invalidPassword}>
                                    <TextField
                                        value={dialog.account.password}
                                        autoFocus={true}
                                        margin="dense"
                                        id="password"
                                        label="Password"
                                        type="password"
                                        fullWidth={true}
                                        variant={"filled"}
                                        error={dialog.invalidPassword}
                                        onChange={e => setDialog({
                                            ...dialog,
                                            invalidPassword: false,
                                            account: {...dialog.account, password: e.target.value}
                                        })}
                                    />
                                    {
                                        dialog.invalidPassword ? <FormHelperText error={dialog.invalidPassword}>Invalid
                                            Password</FormHelperText> : null
                                    }
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose()} color="primary" disabled={dialog.loading}>
                        Cancel
                    </Button>
                    <Button onClick={() => props.onClose(dialog.account)} color="primary" disabled={dialog.loading}>
                        {dialog.loading ? <CircularProgress size={24}/> : "Login"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
SignedOutDialog.propTypes = {
    onClose: PropTypes.func.isRequired
};
export default React.memo(SignedOutDialog);
