const express = require("express");
const router = express.Router();


// Import the controller module
// const controller = require("../controller/product_controller");
const controllerSer = require("../controller/service_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerSer.getAll); // Get all items
router.get("/:id", controllerSer.getById);// Get item by ID
router.delete("/:id", controllerSer.delete); // Delete an item by ID

module.exports = router;
