 // MIDDLEWARE FOR JSON TOKEN VERIFICATION AND DICIDE WEATHER GIVE PERMISION OR NOT

 // DEPENDECIES
 const responseFormat = require('../customLib/responseFormat');
 const jwt = require('jsonwebtoken');
 const secret = require('../secrets/tokenSecret');




 // EXPORT
 module.exports = (req, res, next) => {


     // CHECK FOR THE TOKEN
     const token = req.cookies.token || req.body.token || req.query.token;

     if (token) {

         // VERIFY THE TOKEN
         jwt.verify(token, secret, (err, decoded) => {

             if (err) {
                 let response = responseFormat(true, 'Authentication Failed, invalid token', 401, null);
                 return res.json(response);
             } else {
                 // SAVE THE DECODED VALUES
                 req.decoded = decoded;

                 return next();
             }

         })
     } else {
         // IF TOKEN NOT PRESENT
         let response = responseFormat(true, 'Your are not authenicated to use this', 403, null);
         return res.json(response);
     }

 }