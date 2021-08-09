'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const mongoose = require('mongoose');
const bookModel = require('./schema/Book.model');

const app = express();


const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(`${MONGO_DB_URL}/books`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

const client = jwksClient({
  jwksUri: JWKSURI
});

app.get('/', (req, res) => {

  res.send("Hello From My Server");
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/test', (request, response) => {

  const token = request.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, (error, user) => {
    if (error) {
      response.send('invalid token');
    }
    response.json(user);
  });
})

bookModel.seedUserBooks();

app.get('/books', (req, res) => {
  const { email } = req.query;
  bookModel.userModel.find({ email: email }, (err, user) => {
    if (err || user.length == 0) {
      res.send('no user found');
    }
    else {
      user.forEach(item => {
        res.json(item.books)
        
      })
    }
  });

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
