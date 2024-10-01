const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orgaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cle: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Orga = mongoose.model('Orga', orgaSchema);
module.exports = Orga;