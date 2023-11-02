const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "D:/react/LVTN/frontend/public/image/Loai");
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
const controllerCate = require("../controller/cate_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerCate.getAll); // Get all items
router.get("/:id", controllerCate.getById);// Get item by ID
router.put("/status/:id", controllerCate.updateStatus);
router.post("/", upload.single('cate_img'), controllerCate.create); // Create a new item
router.put("/:id", upload.single('cate_img'), controllerCate.update); // Update an item by ID
router.put("/status/:id", controllerCate.updateStatus); // Update an item by ID
router.delete("/:id", controllerCate.delete); // Delete an item by ID

module.exports = router;
