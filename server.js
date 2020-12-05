// load file env
require('dotenv').config()

// dependencies
import express from 'express';
const app = express();
import indexRoutes from './routes';

// accept json
app.use(express.json());

// accept files static
app.use(express.static(__dirname + '/client/public'));

// config template pug
app.set('views', './client/public/views');
app.set('view engine', 'pug');

// using routes
app.use(indexRoutes);

//start server
app.listen(3000, () => console.log('server started port 3000'));