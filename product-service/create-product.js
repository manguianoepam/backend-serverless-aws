'use strict';
const product = require('./controller/products.controller');
const stock = require('./controller/stocks.controller');
const { v4: uuidv4 } = require('uuid');


module.exports.createProduct = async (event) => {
    let status;

    try {
        console.log(event);
        let body = JSON.parse(event.body);
        if(body.title === undefined || body.description === undefined || body.price === undefined) {
            status = 502;
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
        }
    } catch (error) {
        status = 500;
        console.log(`Error: ${error}`);
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
    };

}