const sharp = require('sharp');
const fetch = require('node-fetch');

const BASE_URL = 'https://storage.googleapis.com/prod-premise-android-observation-us';

module.exports = async function resize(imageUrl, width, height) {
    const res = await fetch(`${BASE_URL}/${imageUrl}`);
    let transform = sharp();

    if (width || height) {
        transform = transform.resize(width, height)
    }
    return res.body.pipe(transform);
}
