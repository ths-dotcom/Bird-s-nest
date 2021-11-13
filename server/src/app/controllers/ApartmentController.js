const Apartment = require('../models/Apartment');

class ApartmentController {
    // [GET] /api/apartments
    showAll(req, res, next) {
        Apartment.find({}).lean()
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
}

module.exports = new ApartmentController;