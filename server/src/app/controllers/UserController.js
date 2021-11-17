require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const {ACCESS_TOKEN_SECRET} = require('../../configs/JWT/index');
const saltRounds = parseInt(process.env.saltRounds);
const { userRole, adminRole } = require('../../configs/datas_roles/roles');

const encodedToken = (userName, slugName, userRole) => {
    return jwt.sign(
        {
            username: userName,
            slug: slugName,
            role: userRole,
            iat: new Date().getTime(), 
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        ACCESS_TOKEN_SECRET
    )
}

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
        // hash mật khẩu
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hash;
        req.body.role = userRole;
        let newUser = new User(req.body);
        newUser.save()
            .then(() => {
                // tạo token
                const token = encodedToken(newUser.username, newUser.slug_name, newUser.role);
                res.setHeader('Authorization', token);
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
        req.body.email = req.body.email.trim();
        req.body.password = req.body.password.trim();

        User.findOne({email: req.body.email}).lean()
            .then(user => {
                if(!user) return res.status(404).json({
                    success: false,
                    message: 'Email chưa chính xác'
                })
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(err) return res.status(500).json({
                        success: false,
                        message: 'Lỗi đăng nhập'
                    })
                    if(result) {
                        // tạo token
                        const token = encodedToken(user.username, user.slug_name, user.role);
                        res.setHeader('Authorization', token);
                        res.json({
                            success: true,
                            message: 'Đăng nhập thành công'
                        })
                    }
                    else res.status(404).json({
                        success: false,
                        message: 'Mật khẩu chưa chính xác'
                    })
                });
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/users/auth-token
    authToken(req, res, next) {
        if(!req.login) return res.json({login: false});
        const Role = (req.user.role === adminRole) ? 'admin' : 'user';
        res.json({
            login: true,
            username: req.user.username,
            slug : req.user.slug,
            role : Role
        }) 
    }

    // [GET] /api/users/orders
    orders(req, res, next) {
        Order.find({cus_slug: req.user.slug}).lean()
            .then(orders => {
                res.json({
                    success: true,
                    orders
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }
}

module.exports = new UserController;