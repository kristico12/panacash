// dependencies
import React, { useState, Fragment } from 'react';
import {
    Typography, TextField,
    InputLabel, Select, MenuItem, Button, Grid, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import UpdateIcon from '@material-ui/icons/update'
import CancelIcon from '@material-ui/icons/Cancel'
// imports
import { statusEnum, typeCall } from '../utils/constans';
import { Call } from '../utils/call';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        overflow: 'auto'
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    messageError: {
        color: 'red'
    },
    modal: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: '90%'
    }
}));
function EditProduct(props) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [product, setProduct] = useState(props.product);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const name = e.hasOwnProperty('target') ? e.target.name : "CreatedAt";
        let value = e.hasOwnProperty('target') ? e.target.value : e._d;
        switch (name) {
            case "Price":
                value = parseFloat(value);
                break;
            case "Quantity":
                value = parseInt(value);
                break;
        }
        const inputProduct = Object.assign({}, product);
        inputProduct[name] = value;
        setProduct(inputProduct);
    }
    const sendEdit = async () => {
        setLoading(true);
        setErrors({});
        const result = await Call(`/api/product`, typeCall.PUT, product)
        if (result.hasOwnProperty('errors')) {
            setErrors(result.errors);
        } else {
            props.getProducts();
            props.onClose();
        }
        setLoading(false);
    };
    return (
        <div style={modalStyle} className={classes.modal}>
            <Typography variant="h3">Editar</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField label="Id" defaultValue={product.Id} type="number" InputProps={{ readOnly: true, }} fullWidth />
                <div>
                    <TextField name="Name" label="Nombre" value={product.Name} onChange={handleChange} required fullWidth />
                    {
                        errors.hasOwnProperty('Name') &&
                        <Fragment>
                            {
                                errors.Name.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
                <div>
                    <TextField name="Description" label="Descripcion" value={product.Description} onChange={handleChange}
                        rows={4} multiline required fullWidth />
                    {
                        errors.hasOwnProperty('Description') &&
                        <Fragment>
                            {
                                errors.Description.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
                <div>
                    <TextField name="Quantity" label="Cantidad" value={product.Quantity} type="number" onChange={handleChange}
                        required fullWidth />
                    {
                        errors.hasOwnProperty('Quantity') &&
                        <Fragment>
                            {
                                errors.Quantity.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
                <div>
                    <TextField name="Warranty" label="Garantia" value={product.Warranty} onChange={handleChange}
                        rows={4} multiline required fullWidth />
                    {
                        errors.hasOwnProperty('Warranty') &&
                        <Fragment>
                            {
                                errors.Warranty.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
                <div>
                    <TextField name="Price" label="Precio" value={product.Price} type="number" onChange={handleChange}
                        required fullWidth />
                    {
                        errors.hasOwnProperty('Price') &&
                        <Fragment>
                            {
                                errors.Price.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
                <div>
                    <InputLabel id="labelStatusEdit" required>Estado</InputLabel>
                    <Select
                        labelId="labelStatusEdit"
                        name="Status"
                        value={product.Status}
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
                                errors.Status.map((item, i) => (
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
                            value={product.CreatedAt}
                            onChange={handleChange}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                    {
                        errors.hasOwnProperty('CreatedAt') &&
                        <Fragment>
                            {
                                errors.CreatedAt.map((item, i) => (
                                    <Typography key={i} className={classes.messageError} variant="h6">{`-${item}`}</Typography>
                                ))
                            }
                        </Fragment>
                    }
                </div>
            </form>
            <Grid container justify="flex-end" alignItems="center">
                <Button variant="contained" color="secondary" onClick={() => props.onClose()} size="medium" startIcon={<CancelIcon />}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={sendEdit} size="medium" startIcon={<UpdateIcon />}>Actualizar</Button>
                {
                    loading && <CircularProgress />
                }
            </Grid>
        </div>
    );
}
export default EditProduct;