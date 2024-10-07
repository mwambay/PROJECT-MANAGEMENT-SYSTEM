const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    id_orga: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_start: {
        type: String,
        require: true
    },
    deadline: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'En cours'
    }


}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
