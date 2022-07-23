const {db} = require('../util/connection.util');

const create = (stock) => new Promise(async (resolve, reject) => {
    try{
        if(stock.id === undefined || stock.count === undefined) {
            reject({status: 502, message: 'Missing Data'});
        } else {
            const client = await db.connect();
            await client.query('SELECT true FROM public.product WHERE id = $1', [stock.id]);
            await client.query('INSERT INTO public.stock (product_id, count) VALUES ($1, $2)', [stock.productId, stock.count]);

            client.release();
            resolve({status: 201, message: 'Stock created'});
        }
    } catch (error) {
        reject({status: 500, message: 'Error', error: error.toString()});
    }
});

module.exports = {
    create
}