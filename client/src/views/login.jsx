// dependencies
import React, { Fragment, useState } from 'react';
// imports
import { typeCall } from '../utils/constans';
import { Call } from '../utils/call';

function Login() {
    const [login, setLogin] = useState({ username: "", password: "" });
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const inputlogin = Object.assign({}, login);
        inputlogin[name] = value;
        setLogin(inputlogin);
    }
    async function signIn() {
        const result = await Call('/api/auth/login', typeCall.POST, login);
        
    }
    return (
        <Fragment>
            <form className="container">
                <label htmlFor="username">
                    UserName:
                    <input type="text" name="username" value={login.username} onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" name="password" value={login.password} onChange={handleChange} />
                </label>
                <input type="button" value="login" onClick={async () => await signIn()} />
            </form>
            <style jsx>{`
                .container {
                    display: grid;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </Fragment>
    );
};

export default Login;