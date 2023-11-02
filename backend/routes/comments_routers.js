const express = require("express");
const router = express.Router();

const controllerComments = require("../controller/comments_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerComments.getAll); // Get all items
router.put("/status/:id", controllerComments.updateStatus); // Get all items
router.get("/:id", controllerComments.getById); // Get item by ID
router.post("/", controllerComments.create); // Create a new item
router.put("/:id", controllerComments.update); // Update an item by ID
router.delete("/:id", controllerComments.delete); // Delete an item by ID

module.exports = router;