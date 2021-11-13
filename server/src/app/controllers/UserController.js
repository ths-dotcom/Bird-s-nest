const User = require('../models/User');

class UserController {
    // [GET] /api/users/:slugName
    infor(req, res, next) {
        User.findOne({slug_name: req.params.slugName}).lean()
            .then(user => {
                if(!user) return res.status(404).json({
                    success: false,
                    message: 'Người dùng không tồn tại'
                })
                res.json({
                    success: true,
                    user
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [POST] /api/users/signup
    signup(req, res, next) {
        let newUser = new User(req.body);
        newUser.save()
            .then(() => {
                res.status(201).json({success: true});
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    err
                });
            });
            
    }

    // [POST] /api/users/login
    login(req, res, next) {
        User.findOne({email: req.body.email}).lean()
            .then(user => {

            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }
}

module.exports = new UserController;