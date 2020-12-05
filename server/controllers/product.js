//dependencies
import Validator from 'validatorjs';
//impors
import { Product } from '../model/Product';
import { validatorProduct } from '../model/Validator';

function SaveProduct(req, res) {
    const product = new Product(
        -1,
        req.body.name,
        req.body.description,
        req.body.quantity,
        req.body.warranty,
        req.body.price,
        req.body.status,
        req.body.createdAt
    );
    //validate
    const validation = new Validator(product, validatorProduct);
    if (!validation.passes()) {
        return res.status(406).json(validation.errors);
    }
    product.save();
    return res.status(201).json(product);
}
function GetProduct(req,res) {
    const product = new Product();
    return res.status(200).json(product.getList());
}
function EditProduct(req, res) {
    const product = new Product(
        req.body.Id,
        req.body.Name,
        req.body.Description,
        req.body.Quantity,
        req.body.Warranty,
        req.body.Price,
        req.body.Status,
        req.body.CreatedAt
    );
    //validate
    const validation = new Validator(product, validatorProduct);
    if (!validation.passes()) {
        return res.status(406).json(validation.errors);
    }
    const result = product.edit();
    if (!result) {
        return res.status(406).json({message: "error al editar"});
    }
    return res.status(200).json(product);
}
function DeleteProduct(req, res) {
    const product = new Product();
    try {
        const result = product.delete(parseInt(req.params.id));
        switch (result) {
            case 0:
                return res.status(406).json({message: "error al Eliminar"});
                break;
            case 1:
                return res.status(406).json({message: "No se puede eliminar producto con estado PUBLISHED"});
                break;
        }        
    } catch (error) {
        return res.status(406).json({message: "A ocurrido un error: "+error});
    }
    return res.status(200).json({"status": "ok"})
}
export {
    SaveProduct,
    GetProduct,
    EditProduct,
    DeleteProduct,
}