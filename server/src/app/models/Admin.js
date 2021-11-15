const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Admin = new Schema(
    {
        email: {type: String, required: true, unique: true}, 
        password: {type: String, required: true},
        username: {type:String, required: true},
        tel: {type: String, required: true},
        address: {type: String, required: true},
        slug_name: { type: String, slug: 'username', unique: true},
        role: {type: Number, required: true}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Admin', Admin);