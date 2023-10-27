const express = require("express");
const router = express.Router();


// Import the controller module
const orderController = require("../controller/orders_controller")
// const controllerCate = require("../controller/cate_controller");

// Define routes and their corresponding controller methods
router.get("/", orderController.getAll); // Get all items
router.get("/:id", orderController.getById); // Get item by ID
router.get("/orders/:id", orderController.getByUser);
router.get("/user/:id", orderController.getByUserCheck);
router.get("/user/orders/:id", orderController.selectInCart);
router.get("/user_checked/:id", orderController.getByUserChecked); // Get all users
router.post("/", orderController.create); // Create a new item
router.put("/:id", orderController.updateOrder); // Update an item by ID
router.delete("/:id", orderController.delete); // Delete an item by ID

module.exports = router;
