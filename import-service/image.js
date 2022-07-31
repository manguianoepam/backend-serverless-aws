'use strict';
const utils = require('./util/aws.functions');

module.exports.importFileParser = async (event) => {
    console.log(JSON.stringify(event));
    for (const record of event.Records) {
        await utils.moveImage(record.s3.object.key)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: `importFileParser executed`
    };
}