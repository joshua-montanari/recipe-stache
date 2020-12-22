const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

require('dotenv').config();

const recipes = require('./routes/recipes');
const categories = require('./routes/categories');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

// Init gfs
let gfs;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('images');
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.use('/recipes', recipes);

app.use('/categories', categories);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});