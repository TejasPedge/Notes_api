const jwt = require('jsonwebtoken');

const ValidateToken = async (req,res,next) => {

    try { 
        const token_string = req.headers.authorization;

        if(!token_string) {
            return res.status(400).send('you can not access this route without token');
        }

        token = token_string.split(' ')[1];

        const PRIVATE_KEY = process.env.PRIVATE_KEY;

        jwt.verify(token,PRIVATE_KEY,(err,decode) => {
            if(err){
                console.log(err);
                return res.status(400).send(err);
            }
            req.payload = decode;
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

module.exports = {ValidateToken}