const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    const mongoAtlasUri = process.env.mongoAtlasUri;
    try {
        await mongoose.connect(mongoAtlasUri);
        console.log('connect successfully');
    } catch (err) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
