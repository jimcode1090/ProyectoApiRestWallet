process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import express from 'express';
import { loadControllers } from "awilix-express";
import loadContainer from './container';
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);


const app: express.Application = express();

// JSON SUPPORT
app.use(express.json());

loadContainer(app);

app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname}
));


export {app};