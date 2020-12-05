// Dependencies
import React, { Fragment, useState } from 'react';
import { Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

//components
import ListTable from './listTable.jsx';
import EditProduct from './editProducts.jsx';

// utils
import { titleProducts, keyproducts, typeCall } from '../utils/constans';
import { Call } from '../utils/call';

function ListProduct(props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [infoProduct, setInfoProduct] = useState({});
    const edit = info => {
        const copyInfo = Object.assign({}, info);
        copyInfo.CreatedAt = new Date(copyInfo.CreatedAt);
        setInfoProduct(copyInfo);
        setOpenEdit(true);
    };
    const deleteProduct = info => {
        const copyInfo = Object.assign({}, info);
        copyInfo.CreatedAt = new Date(copyInfo.CreatedAt);
        setInfoProduct(copyInfo);
        setOpenDelete(true);
    }
    const sendDelete = async () => {
        const result = await Call(`/api/product/${infoProduct.Id}`, typeCall.DELETE)
        if (result.hasOwnProperty('message')) {
            alert(result.message);
        } else {
            props.getProducts();
        }
        setOpenDelete(false);
    }
    return (
        <Fragment>
            <ListTable title={titleProducts} data={props.products} keys={keyproducts}
                showOptions={{ edit: true, delete: true }} funcEdit={info => edit(info)}
                funcDelete={info => deleteProduct(info)}
            />
            <Modal
                open={openEdit}
                onClose={() => { setOpenEdit(false); setInfoProduct({}) }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <EditProduct getProducts={() => props.getProducts()} product={infoProduct} onClose={() => { setOpenEdit(false); setInfoProduct({}) }} />
            </Modal>
            <Dialog
                open={openDelete}
                onClose={() => { setOpenDelete(false); setInfoProduct({}) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Eliminar Producto"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta Seguro que desea eliminar a "{infoProduct.Name}" con id "{infoProduct.Id}" ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDelete(false); setInfoProduct({}) }} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={sendDelete} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
export default ListProduct;