// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// routes
import { Routes } from './routes.jsx';

ReactDOM.render(
    <BrowserRouter>
        {
            Routes
        }
    </BrowserRouter>,
    document.getElementById('react')
);