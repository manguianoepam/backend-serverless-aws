const expect = require('chai').expect;
const tester = require('lambda-tester');
const utils = require('../controller/products.controller');
const getProduct = require('../get-product').getProductById;
const getProducts = require('../get-products').getProductsList;
const createProduct = require('../create-product').createProduct;

describe('product-service', () => {
    describe('lambdas', () => {
        describe('get-product-lambda', () => {
            it('get results from all products', async () => {
                const result = await tester(getProducts)
                    .event({})
                    .expectResult((data) => data);

                expect(result.statusCode).to.equals(200)
                expect(result.body.length > 0).to.equals(true);
            });
        });

        describe('get-products-lambda', () => {
            it('should return 502 when not parameter provide', async () => {
                const result = await tester(getProduct)
                    .event({})
                    .expectResult((data) => data);

                expect(result.statusCode).to.equals(502);
            });

            it('should return 501 when not provide an ID', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {'productId': ''}})
                    .expectResult((data) => data);

                expect(result.statusCode).to.equals(501);
            });

            it('should return 501 when not provide productId parameter', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {}})
                    .expectResult((data) => data);

                console.log(result);
                expect(result.statusCode).to.equals(501);
            });

            it('should return a specific product by id', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {'productId': '7567ec4b-b10c-48c5-9345-fc73c48a80aa'}})
                    .expectResult((data) => data);

                expect(result.statusCode).to.equals(200);
                expect(JSON.parse(result.body).id).to.equals('7567ec4b-b10c-48c5-9345-fc73c48a80aa');
            });
        });

        describe('create-product-lambda', () => {
            it('Should return 503 - when not received a body', async () => {
                const result = await tester(createProduct)
                    .event({})
                    .expectResult(data => data);

                expect(result.statusCode).to.equals(503);
                expect(result.body).to.equals('Data not provided');
            });

            it('Should return 502 - when not received a body', async () => {
                const result = await tester(createProduct)
                    .event({
                        body: '{\r\n' +
                            '    "title": "Test product :D",\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": 10\r\n' +
                            '}',
                    })
                    .expectResult(data => data);

                expect(result.statusCode).to.equals(502);
                expect(result.body).to.equals('Missing Data');
            });

            it('Should return 500 - when use a wrong body', async () => {
                const result = await tester(createProduct)
                    .event({
                        body: '{\r\n' +
                            '    "title": "Test product :D",\r\n' +
                            '    "description": "Test description",\r\n' +
                            '    "price": 10,\r\n' +
                            '}',
                    })
                    .expectResult(data => data);

                expect(result.statusCode).to.equals(500);
            });

            it('Should return 201 - create a product', async () => {
                const result = await tester(createProduct)
                    .event(
                        {
                            resource: '/products',
                            path: '/products',
                            httpMethod: 'POST',
                            headers: {
                                Accept: '*/*',
                                'Accept-Encoding': 'gzip, deflate, br',
                                'CloudFront-Forwarded-Proto': 'https',
                                'CloudFront-Is-Desktop-Viewer': 'true',
                                'CloudFront-Is-Mobile-Viewer': 'false',
                                'CloudFront-Is-SmartTV-Viewer': 'false',
                                'CloudFront-Is-Tablet-Viewer': 'false',
                                'CloudFront-Viewer-ASN': '28509',
                                'CloudFront-Viewer-Country': 'MX',
                                'Content-Type': 'application/json',
                                Host: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                                'Postman-Token': 'da51eb72-aa2e-41ea-a120-6f14e21b1d94',
                                'User-Agent': 'PostmanRuntime/7.29.2',
                                Via: '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)',
                                'X-Amz-Cf-Id': 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==',
                                'X-Amzn-Trace-Id': 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df',
                                'X-Forwarded-For': '187.253.120.36, 130.176.179.78',
                                'X-Forwarded-Port': '443',
                                'X-Forwarded-Proto': 'https'
                            },
                            multiValueHeaders: {
                                Accept: [ '*/*' ],
                                'Accept-Encoding': [ 'gzip, deflate, br' ],
                                'CloudFront-Forwarded-Proto': [ 'https' ],
                                'CloudFront-Is-Desktop-Viewer': [ 'true' ],
                                'CloudFront-Is-Mobile-Viewer': [ 'false' ],
                                'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
                                'CloudFront-Is-Tablet-Viewer': [ 'false' ],
                                'CloudFront-Viewer-ASN': [ '28509' ],
                                'CloudFront-Viewer-Country': [ 'MX' ],
                                'Content-Type': [ 'application/json' ],
                                Host: [ 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com' ],
                                'Postman-Token': [ 'da51eb72-aa2e-41ea-a120-6f14e21b1d94' ],
                                'User-Agent': [ 'PostmanRuntime/7.29.2' ],
                                Via: [
                                    '1.1 e453cfec7ab7b0f50057381607edb486.cloudfront.net (CloudFront)'
                                ],
                                'X-Amz-Cf-Id': [ 'AL_XrwZDLODp365r4ALZNt8piYvuuKet9zEQGxBGUrTB68EID6Tr2w==' ],
                                'X-Amzn-Trace-Id': [ 'Root=1-62db01d2-5bca1ccb57b50f957f73a1df' ],
                                'X-Forwarded-For': [ '187.253.120.36, 130.176.179.78' ],
                                'X-Forwarded-Port': [ '443' ],
                                'X-Forwarded-Proto': [ 'https' ]
                            },
                            queryStringParameters: null,
                            multiValueQueryStringParameters: null,
                            pathParameters: null,
                            stageVariables: null,
                            requestContext: {
                                resourceId: 'cic4y4',
                                resourcePath: '/products',
                                httpMethod: 'POST',
                                extendedRequestId: 'Vr046GH6oAMF93A=',
                                requestTime: '22/Jul/2022:20:00:18 +0000',
                                path: '/dev/products',
                                accountId: '436988374415',
                                protocol: 'HTTP/1.1',
                                stage: 'dev',
                                domainPrefix: 'o3lc79zr1i',
                                requestTimeEpoch: 1658520018467,
                                requestId: 'be81d25d-203b-4d50-9908-b173622b9b35',
                                identity: {
                                    cognitoIdentityPoolId: null,
                                    accountId: null,
                                    cognitoIdentityId: null,
                                    caller: null,
                                    sourceIp: '187.253.120.36',
                                    principalOrgId: null,
                                    accessKey: null,
                                    cognitoAuthenticationType: null,
                                    cognitoAuthenticationProvider: null,
                                    userArn: null,
                                    userAgent: 'PostmanRuntime/7.29.2',
                                    user: null
                                },
                                domainName: 'o3lc79zr1i.execute-api.us-east-1.amazonaws.com',
                                apiId: 'o3lc79zr1i'
                            },
                            body: '{\r\n' +
                                '    "title": "Test product :D",\r\n' +
                                '    "description": "Test description",\r\n' +
                                '    "price": 10,\r\n' +
                                '    "count": 5\r\n' +
                                '}',
                            isBase64Encoded: false
                        }
                    )
                    .expectResult(data => data);

                expect(result.statusCode).to.equals(201);
            });
        });
    });

    describe('function', () => {
        describe('get-products-function', () => {
            it('should return 200 get all products', async () => {
                const result = await utils.selectAll().then((data) => data);

                expect(result.status).to.equals(200);
                expect(result.message).to.equals('Success');
            });
        });
        describe('get-product-function', () => {
            it('should return 204 with not existing ID ', async () => {
                const result = await utils.selectById('AC001')
                    .then((data) => data);

                expect(result.status).to.equals(204)
                expect(result.message).to.equals('Data not found');

            });

            it('should return 501 when not provide an id', async () => {
                const result = await utils.selectById('')
                    .catch((error) => error);

                expect(result.status).to.equals(501)
                expect(result.message).to.equals('ID not provided');

            });

            it('should return 501 when provide an id undefined', async () => {
                const result = await utils.selectById()
                    .catch((error) => error);


                expect(result.status).to.equals(501)
                expect(result.message).to.equals('ID not provided');

            });

            it('should return 200 get product', async () => {
                const result = await utils.selectById('ABC003')
                    .then((data) => data);

                expect(result.status).to.equals(200)
                expect(result.message).to.equals('Success');
            });
        });
    });
});