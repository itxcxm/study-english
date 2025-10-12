const express  = require('express');
const cors = require('cors');
const {register} = require("./controllers/authController.js")
require('dotenv').config();
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());

router.post('/register', register);

module.exports = app
