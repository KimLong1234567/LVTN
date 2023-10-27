const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "D:/react/LVTN/frontend/public/image/contacts");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// const upload = multer({ storage: storage });
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Import the controller module
// const controller = require("../controller/product_controller");
const controllerCotacts = require("../controller/contact_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerCotacts.getAll); // Get all items
router.get("/finish", controllerCotacts.getById); // Get item by ID
router.post("/", upload.single('lh_img'), controllerCotacts.create); // Create a new item
router.put("/:id", controllerCotacts.update); // Update an item by ID
router.delete("/:id", controllerCotacts.delete); // Delete an item by ID

module.exports = router;
