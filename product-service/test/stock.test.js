const expect = require('chai').expect;
const tester = require('lambda-tester');
const utils = require('../controller/stocks.controller')

describe('product-service', () => {
    describe('stock-controller', () => {
        it('Should return a 500 when product not exists', async() => {
            const result = await utils
                .create({id: '040818b0-5f7a-497c-a0f7-8bbc6a9a11ag', count: 5})
                .catch((data) => data);

            expect(result.status).to.equals(500)
            expect(result.message).to.equals('Error');
        });

        it('Should return a 502 when data no provided', async() => {
            const result = await utils
                .create({id: '040818b0-5f7a-497c-a0f7-8bbc6a9a11ag'})
                .catch((data) => data);

            expect(result.status).to.equals(502)
            expect(result.message).to.equals('Missing Data');
        });

        it('Should return a 201 when create a stock', async() => {
            const result = await utils
                .create({id: '040818b0-5f7a-497c-a0f7-8bbc6a9a11af', count: 5})
                .then((data) => data);

            expect(result.status).to.equals(201)
            expect(result.message).to.equals('Stock created');
        });
    });
});