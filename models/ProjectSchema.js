const mongoose = require('mongoose');
const TaskSchema = require('./TaskSchema');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    completed: {
        type: Boolean,
        default: false
    },
    dateUpdated: {
        type: Date, 
        required: true
    },
    tasks: [TaskSchema]

});

module.exports = ProjectSchema;