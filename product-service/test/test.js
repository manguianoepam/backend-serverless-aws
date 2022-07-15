const assert = require('assert');
const expect = require('chai').expect;
const tester = require('lambda-tester');
// const {describe} = require("mocha/lib/cli/run");
const utils = require('../util/functions');
const getProduct = require('../get-product').getProductById;
const getProducts = require('../get-products').getProductsList;

describe('product-service', () => {
    describe('lambdas', () => {
        describe('get-product-lambda', () => {
            it('get results from all active products', async () => {
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

                expect(result.statusCode).to.equals(502)
                //expect(result.message).to.equals('Data not provided');
            });

            it('should return 501 when not provide an ID', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {'productId': ''}})
                    .expectResult((data) => data);

                console.log(result);
                expect(result.statusCode).to.equals(501)
                //expect(result.message).to.equals('Data not provided');
            });

            it('should return 501 when not provide productId parameter', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {}})
                    .expectResult((data) => data);

                console.log(result);
                expect(result.statusCode).to.equals(501)
                //expect(result.message).to.equals('Data not provided');
            });

            it('should return a specific product by id', async () => {
                const result = await tester(getProduct)
                    .event({'pathParameters': {'productId': 'ABC003'}})
                    .expectResult((data) => data);

                console.log(result);
                expect(result.statusCode).to.equals(200)
                expect(JSON.parse(result.body).id).to.equals('ABC003');
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