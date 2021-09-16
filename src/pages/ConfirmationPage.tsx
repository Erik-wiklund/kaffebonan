import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export const ConfirmationPage = () => {

    const classes = useStyles();

    return (
        <div style={rootStyle}>
            <div><CheckCircleIcon /></div>
            <div className={`${classes.contentMargin} ${classes.fontStyle}`}>Tack för din beställning! Din order är på väg.</div>
            <Link to='/' className={classes.textdecoration}>
                <Button className={`${classes.contentMargin} ${classes.buttonMargin}`} variant='contained' color='primary' type='submit'>
                    Till Startsidan
                </Button>
            </Link>
        </div>
    )
}

const rootStyle: CSSProperties = {
    marginTop: '10rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentMargin: {
            margin: '1rem'
        },
        textdecoration: {
            textDecoration: 'none'
        },
        fontStyle: {
            fontweight: 'bold',
            fontFamily: 'sans-serif'
        },
        buttonMargin: {
            marginTop: '5rem'
        },
    }));