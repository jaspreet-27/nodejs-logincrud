const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const bearerHeader = req?.headers?.['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader?.split(' ');
        const token = bearer?.[1];
        jwt.verify(token,process.env.TOKEN_KEY, function(err, decoded) {
            if (err)
            return res.status(500).send({ auth: false, message: err }); 
            req.user_id = decoded.user_id;
            req.email = decoded.email;
            next();
          });
    } else {
        // Access Denied 
        return res.status(401).json({ message: 'invaild token' });
        

    }
}
module.exports = auth;
