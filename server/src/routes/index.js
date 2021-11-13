const aparmentsRouter = require('./aparments');
const usersRouter = require('./users');

function route(app) {
    app.use('/api/apartments', aparmentsRouter);
    app.use('/api/users', usersRouter);
}

module.exports = route;