'use strict';
const AWS = require('aws-sdk');
const csv = require('csv-parser');
const s3 = new AWS.S3({region: 'us-east-1'});

const bucket = 'src-image-shop';
const path = 'uploaded'

const getSignedImage = (image) => new Promise(async (resolve, reject) => {
    try {
        console.log(`getSignedImage`);
        console.log(`Image: ${image}`);
        const params = {
            Bucket: bucket,
            Key: `${path}/${image}.jpg`
        };

        console.log(`Start getSignedUrl function`);
        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                console.log(error);
                reject({status: 500, error, message: 'An error occurred getting signed url'});
            }
            resolve({status: 200, url, message: 'Success'});
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        reject({status: 500, error, message: 'An error occurred getting signed url'});
    }

});

const moveImage = (image) => new Promise(async (resolve, reject) => {
    try {
        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key: image
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', (data) => {
                console.log(data);
            })
            .on('end', async () => {
                console.log(`${bucket}/${image}`);
                await s3.copyObject({
                    Bucket: bucket,
                    CopySource: `${bucket}/${image}`,
                    Key: image.replace('images', path)
                })
                    .promise();

                await s3.deleteObject({
                    Bucket: bucket,
                    Key: image
                })
                    .promise();

                console.log(`Copied into ${bucket}/${image.replace('images', path)}`);
            });

        resolve({status: 201, message: `Function moveImage executed`});
    } catch (error) {
        console.log(error);
        reject({status: 500, message: `An error occurred moving Image ${image}`});
    }
});


module.exports = {
    getSignedImage,
    moveImage
}