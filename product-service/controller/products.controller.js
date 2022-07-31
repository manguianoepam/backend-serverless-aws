const {db} = require('../util/connection.util');

const selectAll = () => new Promise(async (resolve, reject) => {
    try {
        const client = await db.connect();
        // use inner join to get more data from stock
        const result = await client.query('SELECT * FROM product');
        const products = result.rows;
        client.release();

        resolve({status: 200, message: 'Success', products: products});
    } catch (e) {
        reject({status: 500, message: 'Error', error: e.toString()});
    }
});

const selectById = (id) => new Promise(async (resolve, reject) => {
    try {
        if (id === undefined || id === '') {
            reject({status: 501, message: 'ID not provided'});
        } else {
            const client = await db.connect();
            const result = await client.query('SELECT * FROM product WHERE id = $1', [id]);

            let status = result.rows === undefined ? 204 : 200
            let message = result.rows === undefined ? 'Data not found' : 'Success'
            client.release();
            resolve({status, message: message, product: result.rows});
        }
    } catch (e) {
        reject({status: 500, message: 'Error', error: e.toString()});
    }
});

const create = (product) => new Promise(async (resolve, reject) => {
    try {
        const client = await db.connect();
        await client.query(
            'INSERT INTO public.product (id, title, description, price) VALUES ($1, $2, $3, $4)',
            [product.id, product.title, product.description, product.price]
        );
        client.release();
        resolve({status: 201, message: 'Product created'});
    } catch (error) {
        reject({status: 500, message: 'Error', error: error.toString()});
    }
});

module.exports = {
    selectAll,
    selectById,
    create
}