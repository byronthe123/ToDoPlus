const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
    subtaskName: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dateUpdated: {
        type: Date, 
        required: true
    }
});

module.exports = SubtaskSchema;