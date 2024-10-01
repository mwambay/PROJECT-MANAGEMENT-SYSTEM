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
        type: String,
        required: true
    }
}, { timestamps: true });


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

    deadline: {
        type: String,
        required: true
    },


}, { timestamps: true });

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
const Orga = mongoose.model('Orga', orgaSchema);
const Task = mongoose.model('Task', taskSchema);
const Project = mongoose.model('Project', projectSchema);
const Member = mongoose.model('Member', memberSchema);
module.exports = { Orga, Task, Project, Member };