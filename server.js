const express = require('express')
const resize = require('./resize')

const server = express()

server.get('/:imageUrl', async (req, res) => {

    // Extract the image url
    let {imageUrl} = req.params;
    if (!imageUrl) {
        return res.status(500);
    }

    // Extract the query parameters
    let {width, height} = req.query;

    // Parse to integer, if possible
    if (width) {
        width = parseInt(width, 10);
    }
    if (height) {
        height = parseInt(height, 10);
    }

    // Get the resized image
    const imageStream = await resize(imageUrl, width, height);
    const metadata = await imageStream.metadata();

    // Set the content-type of the response based on the image properties
    res.type(`image/${metadata.format || 'jpg'}`)

    // Stream the image to the response
    imageStream.pipe(res)
})

server.listen(8000, () => {
    console.log('Server started!')
})
