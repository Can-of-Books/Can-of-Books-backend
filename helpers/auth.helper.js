const jwksClient = require('jwks-rsa');
const JWKSURI = process.env.JWKSURI;


const client = jwksClient({
    jwksUri: JWKSURI
});



const getKey = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

module.exports = getKey;