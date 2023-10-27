const express = require("express");
const router = express.Router();


// Import the controller module
// const controller = require("../controller/product_controller");
const controllerPnhap = require("../controller/pnhap_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerPnhap.getAll); // Get all items
router.get("/ctpn", controllerPnhap.getByPn); // Update an item by ID
router.get("/:id", controllerPnhap.getById); // Get item by ID
router.get("/ctpn/:id", controllerPnhap.getByPnId); // Get item by ID
router.post("/", controllerPnhap.create); // Create a new item
router.put("/:id", controllerPnhap.update); // Update an item by ID

// router.delete("/:id", controllerPnhap.delete); // Delete an item by ID

module.exports = router;
