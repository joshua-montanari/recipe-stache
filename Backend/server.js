const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const recipes = require('./routes/recipes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// const matchRouter = require('./routes/match');
const usersRouter = require('./routes/users');

// app.use('/match', matchRouter);
app.use('/users', usersRouter);

app.use('/recipes', recipes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});