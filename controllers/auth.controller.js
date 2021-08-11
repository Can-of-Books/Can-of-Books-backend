const jwt = require('jsonwebtoken');
const  getKey  = require('../helpers/auth.helper');


const verifyToken = async (request, response) => {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, (error, user) => {
      if (error) {
        response.send('invalid token');
      }
      response.json(user);
    });
  };
  
  module.exports = verifyToken;