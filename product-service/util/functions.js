const product = require('../model/products');

const selectAll = () => new Promise(async (resolve, reject) => {
    try {
        const products = product.filter((p) => p.active === 1);
        resolve({status: 200, message: 'Success', products});
    } catch (e) {
        reject({status: 500, message: 'Error', error: e.toString()} );
    }
});

const selectById = (id) => new Promise(async (resolve, reject) => {
    try {
        if (id === undefined || id === '') {
            reject({status: 501, message: 'ID not provided'} );
        }
        else {
            const result = product.find((p) => p.id === id);

            let status = result === undefined ? 204 : 200
            let message = result === undefined ? 'Data not found' : 'Success'

            resolve({status, message: message, product: result});
        }

    } catch (e) {
        reject({status: 500, message: 'Error', error: e.toString()} );
    }
});

module.exports = {
    selectAll,
    selectById
}