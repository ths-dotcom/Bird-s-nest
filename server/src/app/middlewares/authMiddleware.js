const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function authToken(req, res, next) {
    // lấy token từ header
    const token = req.header('Authorization');
    if(!token) return res.status(403).json({
        success: false,
        message: 'token không đúng'
    })
    jwt.verify(token, ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) return res.status(403).json({success: false});
        let now = new Date().getTime();
        if(decoded.exp<now) return res.json({
            success: false,
            message: 'Hết phiên đăng nhập'
        })
        req.user = decoded;
        next();
    });
}

module.exports = authToken;