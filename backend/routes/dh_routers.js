const express = require("express");
const router = express.Router();


// Import the controller module
// const controller = require("../controller/product_controller");
const controllerDh = require("../controller/dh_controller");

// Define routes and their corresponding controller methods
router.get("/", controllerDh.getAll); // Get all items
router.get("/dh", controllerDh.getByDh); // Update an item by ID
router.get("/:id", controllerDh.getById); // Get item by ID
router.get("/dh/:id", controllerDh.getByUserId);
router.get("/dhang/all", controllerDh.getAllBill);
router.get("/dhang/success", controllerDh.getDhSuccess);
router.get("/dhang/success/:id", controllerDh.getDhSuccessId);
router.get("/shipper/destroy/:id", controllerDh.getShipperDestroy);
router.get("/shipper/:id", controllerDh.getByShipperId);
router.get("/shipper/success/:id", controllerDh.getShipperSuccess);
router.post("/", controllerDh.create); // Create a new item
router.put("/:id", controllerDh.update); // Update an item by ID
router.delete("/:id", controllerDh.delete);

// router.delete("/:id", controllerPnhap.delete); // Delete an item by ID

module.exports = router;
