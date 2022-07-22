'use strict';
const util = require('./controller/products.controller');

module.exports.getProductById = async (event) => {
    let product = {};
    let status;

    if(!event[`pathParameters`]) {
        status = 502;
    } else {
        const productId = event[`pathParameters`].productId;

        if(productId === undefined || productId === '') {
            status = 501;
        } else {
            const result = await util.selectById(productId)
                .then((data) => data)
                .catch((error) => error);

            status = result.status;
            product = status === 200 ? result.product : {};
        }
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product)
    };
}