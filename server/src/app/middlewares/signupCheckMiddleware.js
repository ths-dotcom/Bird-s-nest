const User = require('../models/User');

function signupCheck(req, res, next) {
    if(!req.body) return res.status(400).json({
        success: false
    })
    User.findOne({email: req.body.email}).lean()
        .then(user => {
            if(user) return res.status(400).json({
                success: false,
                message: 'Email đã đăng kí tài khoản'
            })
            return next();
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        }) 
}

module.exports = signupCheck;