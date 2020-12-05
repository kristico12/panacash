//dependencies
import Validator from 'validatorjs';
//impors
import { Auth } from '../model/Auth';
import { validatorAuth } from '../model/Validator';

function Login(req, res) {
    const auth = new Auth(
        req.body.username,
        req.body.password
    );
    //validate
    const validation = new Validator(auth, validatorAuth);
    if (!validation.passes()) {
        return res.status(406).json(validation.errors);
    }
    
}

export {
    Login
}