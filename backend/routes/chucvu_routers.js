const express = require('express');
const router = express.Router();

const controllerCv = require('../controller/chucvu_controller');

// Define routes and their corresponding controller methods
router.get('/', controllerCv.getChucVu); // Get all items

module.exports = router;
