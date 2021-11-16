const Apartment = require('../models/Apartment');
const Apartment_type = require('../models/Apartment_type');
const Feedback = require('../models/Feedback');
const User = require('../models/User');

class ApartmentController {
    // [GET] /api/apartments
    showAll(req, res, next) {
        Apartment.find({}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/all-count
    allCount(req, res, next) {
        Apartment.find({}).count()
            .then(count => {
                res.json({
                    success: true,
                    count
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName
    detail(req, res, next) {
        Apartment.findOne({slug: req.params.slugName}).lean()
            .then(apartment => {
                if(!apartment) return res.status(404).json({
                    success: false,
                    message: 'Phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartment
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] api/apartments/types
    types(req, res, next) {
        Apartment_type.find({}).lean()
            .then(apartment_types => {
                res.json({
                    success: true,
                    apartment_types
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] api/apartments/types/:slugName
    typeDetail(req, res, next) {
        Apartment_type.findOne({slug: req.params.slugName}).lean()
            .then(apartment_type => {
                if(!apartment_type) return res.status(404).json({
                    success: false,
                    message: 'Loại phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartment_type
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [GET] api/apartments/types/:slugName/apartments
    apartmentsOfType(req, res, next) {
        Apartment.find({type_slug: req.params.slugName}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                if(!apartments.length) return res.status(404).json({
                    success: false,
                    message: 'Loại phòng không tồn tại'
                })
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName/related-products/:slugType
    relatedProducts(req, res, next) {     
        Apartment.find({slug: {$ne: req.params.slugName}, slug_type: req.params.slugType}, {name:1, price:1, slug:1, images:1}).lean()
            .then(apartments => {
                if(!apartments.length) return res.status(404).json({
                    success: false,
                    message: 'Không thấy sản phẩm tương tự'
                })
                res.json({
                    success: true,
                    apartments
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                })
            })
    }

    // [GET] /api/apartments/:slugName/get-feedbacks
    getFeedbacks(req, res, next) {
        Feedback.find({apartment_slug: req.params.slugName}).lean()
            .then(feedbacks => {
                res.json({
                    success: true,
                    feedbacks
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                err
            }))
    }

    // [POST] /api/apartments/:slugName/add-feedback
    addFeedback(req, res, next) {
        if(req.login) {
            User.findOne({slug_name: req.user.slug}).lean()
                .then(user => {
                    const feedback = new Feedback({
                        apartment_slug: req.params.slugName, 
                        cus_slug: user.slug_name, 
                        cus_name: user.username, 
                        cus_avatar: user.avatar,
                        comment: req.body.comment
                    });
                    return feedback;
                })
                .then(feedback => {
                    feedback.save()
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'Đã lưu phản hồi'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        err
                    })
                })
        }
    }
}

module.exports = new ApartmentController;