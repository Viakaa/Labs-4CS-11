import express from 'express';
import bodyParser from 'body-parser';
import { OrdersRouter } from './orders.router.js';
import  UserRouter  from './users.router.js';

const app = express();

app.use(bodyParser.json());

app.use(OrdersRouter);
app.use( UserRouter);

app.listen(8080, () => console.log('Server was started'));

/**
 * POST -- create resource
 * req -> input data
 * res -> output data
 */
