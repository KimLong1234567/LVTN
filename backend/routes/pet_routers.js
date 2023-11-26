const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "D:/react/LVTN/frontend/public/image/Pet");
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
const petController = require("../controller/pet_controller")
// const controllerCate = require("../controller/cate_controller");

// Define routes and their corresponding controller methods
router.get("/", petController.getAll);
router.get("/:id", petController.getById);
router.get("/userPet/:id", petController.getByUser);
router.post("/", upload.single('p_img'), petController.create);
router.post("/pet/:id", petController.updateUser);
router.put("/:id", petController.updateAdmin);
router.delete("/:id", petController.delete);

module.exports = router;
