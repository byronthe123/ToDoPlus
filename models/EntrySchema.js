const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    taskId: String,
    taskName: String,
    productiveTime: {
        type: Number,
        default: 0
    }
});

module.exports = EntrySchema;