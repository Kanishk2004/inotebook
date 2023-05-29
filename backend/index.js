const dbConnection = require('./config/db');
require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors');
 
dbConnection();

// regular middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//import all routes here
const user = require('./routes/user');
const note = require('./routes/notes');

//router middleware
app.use('/api/v1', user);
app.use('/api/v1', note);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

// continue from lecture 53 --codeWithharry