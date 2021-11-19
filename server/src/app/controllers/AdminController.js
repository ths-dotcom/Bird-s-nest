require('dotenv').config();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

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

class AdminController {
    // [GET] /api/admins/:slugName
    infor(req, res, next) {
        Admin.findOne({slug_name: req.params.slugName}).lean()
            .then(admin => {
                if(!admin) return res.json({
                    success: false,
                    message: 'Người dùng không tồn tại'
                })
                res.json({
                    success: true,
                    admin
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [POST] /api/admins/signup
    signup(req, res, next) {
        // hash mật khẩu
        const hash = bcrypt.hashSync(req.body.data.password, saltRounds);
        req.body.data.password = hash;
        req.body.data.role = adminRole;
        let newAdmin = new Admin(req.body.data);
        newAdmin.save()
            .then(() => {
                // tạo token
                const token = encodedToken(newAdmin.username, newAdmin.slug_name, newAdmin.role);
                res.setHeader('Authorization', token);
                res.status(201).json({
                    success: true,
                    token
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    err
                });
            });
            
    }

    // [POST] /api/admins/login
    login(req, res, next) {
        req.body.email = req.body.data.email.trim();
        req.body.password = req.body.data.password.trim();

        Admin.findOne({email: req.body.email}).lean()
            .then(admin => {
                if(!admin) return res.json({
                    success: false,
                    message: 'Email chưa chính xác'
                })
                bcrypt.compare(req.body.password, admin.password, function(err, result) {
                    if(err) return res.status(500).json({
                        success: false,
                        message: 'Lỗi đăng nhập'
                    })
                    if(result) {
                        // tạo token
                        const token = encodedToken(admin.username, admin.slug_name, admin.role);
                        res.setHeader('Authorization', token);
                        res.json({
                            success: true,
                            token,
                            message: 'Đăng nhập thành công'
                        })
                    }
                    else res.json({
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

    // [GET] /api/admins/orders/waiting
    waiting(req, res, next) {
        Order.find({status: null}).lean()
            .then(orders => {
                res.json({
                    success: true,
                    orders
                })
            })
            .catch(err => res.json({
                success: false,
                err
            }))
    }

    // [PATCH] /api/admins/orders/:id/confirm
    confirm(req, res, next) {
        Order.updateOne({_id: req.params.id}, {
            $set :{ status: 'confirmed' }
        })
            .then(() => res.json({
                success: true,
                message: 'Xác nhận đơn hàng thành công'
            }))
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] /api/admins/orders/confirmed
    confirmed(req, res, next) {
        Order.find({status: 'confirmed', check_in_date: null}).lean()
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

    // [PATCH] /api/admins/orders/:id/check-in
    checkin(req, res, next) {
        Order.updateOne({_id: req.params.id}, {
            $set :{ check_in_date: new Date() }
        })
            .then(() => res.json({
                success: true,
                message: 'Check in thành công'
            }))
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] /api/admins/orders/staying
    staying(req, res, next) {
        Order.find({
            return_date: null, 
            check_in_date: {$ne: null},
            status: 'confirmed'
        }).lean()
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

    // [PATCH] /api/admins/orders/:id/check-out
    checkout(req, res, next) {
        Order.updateOne({_id: req.params.id}, {
            $set :{ return_date: new Date() }
        })
            .then(() => {
                Order.findOne({_id: req.params.id}).lean()
                    .then(pay => {
                        let payMent = pay.price;
                        let days = pay.return_date.getDate() - pay.check_in_date.getDate();
                        payMent = days ? payMent*days : payMent;
                        res.json({
                            success: true,
                            payment: payMent,
                            message: 'Thanh toán'
                        })
                    })
                    .catch(err => res.status(500).json({
                        success: false,
                        err
                    }))
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [PATCH] /api/admins/orders/:id/cancel
    cancel(req, res, next) {
        Order.updateOne({_id: req.params.id}, {
            $set :{ status: 'canceled' }
        })
            .then(() => res.json({
                success: true,
                message: 'Hủy phòng thành công'
            }))
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }
}

module.exports = new AdminController;