const mongoose = require('mongoose');
const EntrySchema = require('./EntrySchema');

const ProductivitySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    productivityGoal: {
        type: Number,
        required: true,
        default: 0
    },
    productivityAchieved: {
        type: Number,
        default: 0
    },
    entries: [EntrySchema]

});

// export
module.exports = ProductivitySchema;