const mongoose = require('mongoose');
const SubtaskSchema = require('./SubtaskSchema');

const TaskSchema = new mongoose.Schema({
    taskName: {
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
    dueDate: {
        type: Date
    },
    note: {
        type: String
    },
    dateUpdated: {
        type: Date, 
    },
    subtasks: [SubtaskSchema]
});

module.exports = TaskSchema;