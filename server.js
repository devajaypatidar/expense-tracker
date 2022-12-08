const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./confing/db');

dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/transaction');
const app = express();

app.use(express.json());
const NODE_ENV = process.env.NODE_ENV || "production";
if( NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions',transactions);

if(NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req, res) => 
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


