import { createStyles, makeStyles } from '@material-ui/styles'
import { Theme } from 'pretty-format'
import { RouteComponentProps } from 'react-router-dom'
import { ProductInformation } from '../components/ProductInformation'
import { productArray } from '../data'

interface Props extends RouteComponentProps<{ id: string }> { }

export const ProductPage = (props: Props) => {

    const product = productArray.find((p) => p.id === props.match.params.id)

    const classes = useStyles();

    if (!product) {
        return <h1 className={classes.contentMargin}>404 not found yo</h1>
    } else {
        return (
            <div className={`${classes.contentMargin} ${classes.justifyCenter} ${classes.flex} ${classes.flexWrap} ${classes.imgPadding}`}>
                <img src={product.imageUrl} alt='' className={classes.imgSize} />
                <ProductInformation product={product} />
            </div>
        )
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentMargin: {
            marginTop: '4rem'
        },
        flex: {
            display: 'flex',
        },
        justifyCenter: {
            justifyContent: 'center'
        },
        imgSize: {
            maxHeight: '320px',
            height: '80%',
        },
        flexWrap: {
            flexWrap: 'wrap'
        },
        imgPadding: {
            paddingTop: '1rem'
        }
    }));