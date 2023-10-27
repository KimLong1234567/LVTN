const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "D:/react/LVTN/frontend/public/image/Avt");
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
const controllerAdmin = require("../controller/admin_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerAdmin.getAll); // Get all items
router.get("/:id", controllerAdmin.getById); // Get item by ID
router.post("/", upload.single('nv_avt'), controllerAdmin.create); // Create a new item
router.put("/:id", upload.single('nv_avt'), controllerAdmin.update); // Update an item by ID
router.delete("/:id", controllerAdmin.delete); // Delete an item by ID
router.post("/login", controllerAdmin.login);
module.exports = router;
