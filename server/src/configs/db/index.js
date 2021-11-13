const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    // const mongoAtlasUri = process.env.mongoAtlasUri;
    const mongoAtlasUri = "mongodb+srv://admin:admin@birdsnest.0rzqb.mongodb.net/Bird'snest?retryWrites=true&w=majority";
    try {
        await mongoose.connect(mongoAtlasUri);
        console.log('connect successfully');
    } catch (err) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
