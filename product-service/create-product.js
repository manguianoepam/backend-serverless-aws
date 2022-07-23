'use strict';
const product = require('./controller/products.controller');
const stock = require('./controller/stocks.controller');
const {v4: uuidv4} = require('uuid');


module.exports.createProduct = async (event) => {
    let status;
    let message = 'An error occurred';
    try {
        if (event.body === undefined) {
            status = 503;
            message = 'Data not provided';
        } else {
            let body = JSON.parse(event.body);
            if (body.title === undefined
                || body.description === undefined
                || body.price === undefined
                || body.count === undefined) {
                status = 502;
                message = 'Missing Data';
            } else {
                const p = {};

                p.id = uuidv4();
                p.title = body.title;
                p.description = body.description;
                p.price = body.price;

                await product.create(p);

                const s = {};
                s.productId = p.id;
                s.count = body.count;

                await stock.create(s);
                status = 201;
                message = `Product created - ID: ${p.id}`
            }
        }
    } catch (error) {
        status = 500;
        message = `Error: ${error}`;
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: message
    };

}