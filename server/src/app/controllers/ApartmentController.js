const Apartment = require('../models/Apartment');
const Apartment_type = require('../models/Apartment_type');

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
        // res.json(req.params.slugName);
        Apartment_type.find({_id: req.params.slugName}).lean()
            .then(typeDetail =>{
                if(!apartment_type) return res.status(404).json({
                    success: false,
                    message: 'Loại phòng không tồn tại'
                })
                res.jons({
                    success: true,
                    typeDetail
                })
            })
            .catch(err => res.status(500).json({
                success: 'abc',
                err
            }))
    }
}

module.exports = new ApartmentController;