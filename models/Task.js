const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id_project: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },

    assignedTo: {
        type: Object,
        required: true
    },
    state: {
        type: String,
        default: 'En cours'
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;