const express = require('express');
const app = express();
const port = 3001;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const route = require('./routes/index');
const db = require('./configs/db/index');
require('dotenv').config()
const path = require('path');

app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

db.connect();

app.use(express.static(path.join(__dirname + '/public')));

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})