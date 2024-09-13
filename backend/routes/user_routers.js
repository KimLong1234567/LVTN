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
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Import the controller module
const usersController = require("../controller/user_controller");

// Define routes and their corresponding controller methods
router.get("/", usersController.getAll); // Get all items
router.get("/:id", usersController.getById); // Get item by ID
router.get("/user/:id", usersController.getByUser); // Get item by ID
router.post("/", upload.single('user_avt'), usersController.create); // Create a new item
router.post("/gg", usersController.createGoogleAcc); // Create a new item
router.put("/:id", upload.single('user_avt'), usersController.update); // Update an item by ID
router.delete("/:id", usersController.delete); // Delete an item by ID
router.post("/login", usersController.login);
router.post("/reset-password", usersController.resetPassword);
router.get("/get-token/:token", usersController.getToken);
router.post("/reset-password/:email", usersController.updateResetPassword);

module.exports = router; 
