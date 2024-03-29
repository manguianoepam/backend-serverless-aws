'use strict';

module.exports.hello = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                productName: 'Book',
                price: 230.02
            }
        )
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};