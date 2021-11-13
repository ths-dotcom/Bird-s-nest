const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Apartment = new Schema(
    {
        name: {type: String}, 
        area: {type: String},
        number_of_cus: {type:String, required: true},
        price: {type: Number},
        description: {type: String},
        slug: { type: String, slug: 'name', unique: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Apartment', Apartment);
