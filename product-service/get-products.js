'use strict'
const util = require('./util/functions');

module.exports.getProductsList = async () => {
    const result = await util.selectAll()
        .then((data) => data)
        .catch((error) => error);

    const status = result.status;
    const products = result.status === 200 ? result.products : {};

    return {
        statusCode: status,
        body: JSON.stringify(products),
        //message: result.message
    };
};