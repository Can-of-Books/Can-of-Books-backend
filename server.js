'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;

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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
