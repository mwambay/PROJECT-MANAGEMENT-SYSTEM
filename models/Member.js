const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    id_orga: {
        type: String,
        required: true
    },

    id_project: {
        type: String,
        required: false
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    as_admin: {
        type: Boolean,
        required: true
    },

}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;