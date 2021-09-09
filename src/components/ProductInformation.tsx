import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import { Product } from "../data"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface Props {
    product: Product;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ProductInformation = ({ product }: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        addToCart(product);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { addToCart } = useContext(CartContext);

    return (
        <div className={classes.flex + ' ' + classes.columnDirection + ' ' + classes.flexGrowOne + ' ' + classes.textSize + ' ' + classes.textMargin}>
            <h1>{product?.name}</h1>
            <div className={classes.flex + ' ' + classes.spaceBetween}>
                <h2>{product.price} kr</h2>
                <Button color="inherit" onClick={handleClick}>
                    <AddShoppingCartIcon />
                </Button>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {product.name} added to cart
                    </Alert>
                </Snackbar>
            </div>
            <p>{product.info}</p>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
        }, columnDirection: {
            flexDirection: 'column'
        }, flexGrowOne: {
            flexGrow: 0.5
        }, textMargin: {
            marginLeft: '1rem',
            marginRight: '1rem'
        }, textSize: {
            maxWidth: '40rem',
            minWidth: '280px'
        }, spaceBetween: {
            justifyContent: 'space-between'
        }
    }));