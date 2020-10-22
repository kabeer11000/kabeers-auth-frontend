import React from 'react';
import './StepperBase.css';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginLogic from "../LoginLogic";
import PermessionsScreen from "../PermessionsScreen/PermessionsScreen.lazy";
import CircularProgress from "@material-ui/core/CircularProgress";
import HideOnScroll from "../HideOnScroll/HideOnScroll";
import Link from "@material-ui/core/Link";
import {pure} from "recompose";
import withRouter from "react-router-dom/es/withRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


const getSteps = () => ['Sign In', 'Allow App'];
const StepperBase = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => false;
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        // props.history.push({
        //     pathname: "/auth/continue",
        //     search: `?id=${generateRandomHash(20)}`
        // });
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <LoginLogic callNext={handleNext} callBack={handleBack}/>;
            case 1:
                return <PermessionsScreen/>;
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <Stepper activeStep={activeStep} className={'fixed-top'} elevation={2}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) labelProps.optional =
                            <Typography variant="caption">Optional</Typography>;
                        if (isStepSkipped(index)) stepProps.completed = false;

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </HideOnScroll>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            <div className={'text-center'}>
                                <CircularProgress/>
                                <br/>
                                <Typography>
                                    You are being Redirected to the app
                                </Typography>
                            </div>
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                    </div>
                )}
            </div>
            <div className={"d-none"}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="http://kabeersnetwork.dx.am">
                        Kabeers Network
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </div>
        </div>
    );
};
StepperBase.propTypes = {};

StepperBase.defaultProps = {};

export default withRouter(pure(StepperBase));
