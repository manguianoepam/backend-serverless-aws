'use strict'
const util = require('./controller/products.controller');

module.exports.getProductsList = async () => {
    const result = await util.selectAll()
        .then((data) => data)
        .catch((error) => error);

    const status = result.status;
    const products = result.status === 200 ? result.products : {};

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products)
    };
};