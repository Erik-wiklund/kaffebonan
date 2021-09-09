import React, { FormEvent, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: ""
};

const errorMessages = {
    emailErrorMsg: "",
    firstNameErrorMsg: "",
    lastNameErrorMsg: "",
    addressErrorMsg: "",
    zipCodeErrorMsg: "",
    cityErrorMsg: ""
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OrderForm = () => {

    const { emptyCart } = useContext(CartContext);

    const classes = useStyles();

    const [formValues, setformValues] = useState(defaultValues);
    const [doRedirect, setDoRedirect] = useState(false);

    const [errorMessage, setErrorMessage] = useState(errorMessages);
    const [open, setOpen] = useState(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const validateField = (value: string, type: string) => {
        let reg;

        switch (type) {
            case "email":
                reg = new RegExp(/^(?!.*\.{2})[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i).test(value);
                reg ? setErrorMessage({ ...errorMessage, emailErrorMsg: "" }) : setErrorMessage({ ...errorMessage, emailErrorMsg: "Not an email address" });
                break;
            case "firstName":
                reg = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u).test(value);
                reg ? setErrorMessage({ ...errorMessage, firstNameErrorMsg: "" }) : setErrorMessage({ ...errorMessage, firstNameErrorMsg: "Must be letters" });
                break;
            case "lastName":
                reg = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u).test(value);
                reg ? setErrorMessage({ ...errorMessage, lastNameErrorMsg: "" }) : setErrorMessage({ ...errorMessage, lastNameErrorMsg: "Must be letters" });
                break;
            case "address":
                reg = new RegExp(/^[0-9a-zA-Z]+$/).test(value);
                reg ? setErrorMessage({ ...errorMessage, addressErrorMsg: "" }) : setErrorMessage({ ...errorMessage, addressErrorMsg: "Unknown symbol" });
                break;
            case "city":
                reg = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u).test(value);
                reg ? setErrorMessage({ ...errorMessage, cityErrorMsg: "" }) : setErrorMessage({ ...errorMessage, cityErrorMsg: "Must be letters" });
                break;
            case "zipCode":
                reg = new RegExp(/(?:^|\D)(\d{5})(?!\d)/g).test(value);
                reg ? setErrorMessage({ ...errorMessage, zipCodeErrorMsg: "" }) : setErrorMessage({ ...errorMessage, zipCodeErrorMsg: "Must be 5 numbers" });
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (Object.values(errorMessage).every(value => value === ""))
        {
            setDoRedirect(true);
            emptyCart();
        }
        else{
            setOpen(true);
        }        
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.formMargin}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField

                            fullWidth
                            label="E-mail"
                            variant="outlined"

                            required
                            type="email"

                            value={formValues.email}
                            onChange={e => {
                                validateField(e.target.value, "email");
                                setformValues({ ...formValues, email: e.target.value })
                            }}
                            error={errorMessage.emailErrorMsg !== ""}
                            helperText={errorMessage.emailErrorMsg}
                        />

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            required
                            value={formValues.firstName}
                            onChange={e => {
                                validateField(e.target.value, "firstName");
                                setformValues({ ...formValues, firstName: e.target.value })
                            }}
                            error={errorMessage.firstNameErrorMsg !== ""}
                            helperText={errorMessage.firstNameErrorMsg}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            required
                            value={formValues.lastName}
                            onChange={e => {
                                validateField(e.target.value, "lastName");
                                setformValues({ ...formValues, lastName: e.target.value })
                            }}
                            error={errorMessage.lastNameErrorMsg !== ""}
                            helperText={errorMessage.lastNameErrorMsg}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            required
                            value={formValues.address} 
                            onChange={e => {
                                validateField(e.target.value, "address");
                                setformValues({ ...formValues, address: e.target.value })
                            }}
                            error={errorMessage.addressErrorMsg !== ""}
                            helperText={errorMessage.addressErrorMsg}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="Zip Code"
                            variant="outlined"
                            required
                            value={formValues.zipCode}
                            onChange={e => {
                                validateField(e.target.value, "zipCode");
                                setformValues({ ...formValues, zipCode: e.target.value })
                            }}
                            error={errorMessage.zipCodeErrorMsg !== ""}
                            helperText={errorMessage.zipCodeErrorMsg}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            label="City"
                            variant="outlined"
                            required
                            value={formValues.city}
                            onChange={e => {
                                validateField(e.target.value, "city");
                                setformValues({ ...formValues, city: e.target.value })
                            }}
                            error={errorMessage.cityErrorMsg !== ""}
                            helperText={errorMessage.cityErrorMsg}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                Erroneous Input
                            </Alert>
                        </Snackbar>
                        {doRedirect && < Redirect to="/confirmation" />}
                    </Grid>
                </Grid>
            </div >
        </form >
    );
};

export default OrderForm;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentMargin: {
            marginTop: "2rem"
        },
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        formMargin: {
            margin: "10%",
            maxWidth: "1000px"
        },
        outerFormMargin: {
            margin: "25%",
            maxWidth: "200px"
        },
        maxwidth: {
            maxWidth: "75%"
        },
        Grid: {
            display: "inline-grid"
        }
    }));