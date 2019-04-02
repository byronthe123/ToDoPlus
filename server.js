const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/react3');
const db = mongoose.connection;

app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use(morgan());

app.use('/api', routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Byron's app is running.`);
});
