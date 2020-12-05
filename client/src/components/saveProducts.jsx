// dependencies
import React, { useState, Fragment } from 'react';
import {
    Card, CardActions, CardContent, Typography, TextField,
    InputLabel, Select, MenuItem, Button, Grid, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SaveIcon from '@material-ui/icons/Save'
// imports
import { statusEnum, typeCall } from '../utils/constans';
import { Call } from '../utils/call';

const initalStateProduct = {
    name: '',
    description: '',
    quantity: 0,
    warranty: '',
    price: 0,
    status: '',
    createdAt: new Date()
}
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    messageError: {
        color: 'red'
    }
}));
function SaveProduct(props) {
    const classes = useStyles();
    const [product, setProduct] = useState(initalStateProduct);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const name = e.hasOwnProperty('target') ? e.target.name : "createdAt";
        let value = e.hasOwnProperty('target') ? e.target.value : e._d;
        switch (name) {
            case "price":
                value = parseFloat(value);
                break;
            case "quantity":
                value = parseInt(value);
                break;
        }
        const inputProduct = Object.assign({}, product);
        inputProduct[name] = value;
        setProduct(inputProduct);
    }
    const sendSave = async () => {
        setLoading(true);
        setErrors({});
        const result = await Call('/api/product', typeCall.POST, product)
        if (result.hasOwnProperty('errors')) {
            setErrors(result.errors);
        } else {
            props.getProducts();
            setProduct(initalStateProduct);
        }
        setLoading(false);
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h3">Agregar</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField name="name" label="Nombre" value={product.name} onChange={handleChange} required fullWidth />
                        {
                            errors.hasOwnProperty('Name') &&
                            <Fragment>
                                {
                                    errors.Name.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <TextField name="description" label="Descripcion" value={product.description} onChange={handleChange}
                            rows={4} multiline required fullWidth />
                        {
                            errors.hasOwnProperty('Description') &&
                            <Fragment>
                                {
                                    errors.Description.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <TextField name="quantity" label="Cantidad" value={product.quantity} type="number" onChange={handleChange}
                            required fullWidth />
                        {
                            errors.hasOwnProperty('Quantity') &&
                            <Fragment>
                                {
                                    errors.Quantity.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <TextField name="warranty" label="Garantia" value={product.warranty} onChange={handleChange}
                            rows={4} multiline required fullWidth />
                        {
                            errors.hasOwnProperty('Warranty') &&
                            <Fragment>
                                {
                                    errors.Warranty.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <TextField name="price" label="Precio" value={product.price} type="number" onChange={handleChange}
                            required fullWidth />
                        {
                            errors.hasOwnProperty('Price') &&
                            <Fragment>
                                {
                                    errors.Price.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <InputLabel id="labelStatus" required>Estado</InputLabel>
                        <Select
                            labelId="labelStatus"
                            name="status"
                            value={product.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="">Seleccionar...</MenuItem>
                            {
                                statusEnum.map(val => (
                                    <MenuItem key={val} value={val}>{val}</MenuItem>
                                ))
                            }
                        </Select>
                        {
                            errors.hasOwnProperty('Status') &&
                            <Fragment>
                                {
                                    errors.Status.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                    <div>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Fecha de Creacion"
                                format="YYYY-MM-DD"
                                value={product.createdAt}
                                onChange={handleChange}
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                        {
                            errors.hasOwnProperty('CreatedAt') &&
                            <Fragment>
                                {
                                    errors.CreatedAt.map((item,i) => (
                                        <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                    ))
                                }
                            </Fragment>
                        }
                    </div>
                </form>
            </CardContent>
            <CardActions>
                <Grid container justify="flex-end" alignItems="center">
                    <Button variant="contained" color="primary" onClick={sendSave} size="medium" startIcon={<SaveIcon />}>Guardar</Button>
                    {
                        loading && <CircularProgress />
                    }
                </Grid>
            </CardActions>
        </Card>
    );
}
export default SaveProduct;