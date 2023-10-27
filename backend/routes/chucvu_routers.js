const express = require("express");
const router = express.Router();

const controllerCv = require("../controller/chucvu_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerCv.getChucVu); // Get all items
// router.get("/:id", controllerAdmin.getById); // Get item by ID
// router.get("/cv", controllerAdmin.getChucVu);
// router.post("/", upload.single('avt'), controllerAdmin.create); // Create a new item
// router.put("/:id", upload.single('avt'), controllerAdmin.update); // Update an item by ID
// router.delete("/:id", controllerAdmin.delete); // Delete an item by ID

module.exports = router;