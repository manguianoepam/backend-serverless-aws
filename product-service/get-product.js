'use strict';
const util = require('./util/functions');

module.exports.getProductById = async (event) => {
    let product = {};
    let status;
    let message;

    if(!event[`pathParameters`]) {
        status = 502;
        message = 'Data not provided'
    } else {
        const productId = event[`pathParameters`].productId;

        if(productId === undefined || productId === '') {
            status = 501;
            message = 'Data not provided'
        } else {
            const result = await util.selectById(productId)
                .then((data) => data)
                .catch((error) => error);

            status = result.status;
            product = status === 200 ? result.product : {};
            message = result.message;
        }
    }

    return {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product),
        //message: message
    };
}