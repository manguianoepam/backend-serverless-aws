'use strict';
const util = require('./util/aws.functions');

module.exports.importProductsFile = async (event) => {
    const image = event[`pathParameters`].nameImage;
    const result = await util.getSignedImage(image).then(url => url).catch(error => error);

    const body = {};
    body.message = result.message;
    body.url = result.status === 200 ? result.url : '';

    return {
        statusCode: result.status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body)
    };
}