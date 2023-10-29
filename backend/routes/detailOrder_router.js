const express = require("express");
const router = express.Router();
const dhDetailController = require("../controller/detailOrder_controller");

router.get("/", dhDetailController.getAll); // Lấy tất cả chi tiết phiếu nhập
router.get("/:id", dhDetailController.getById); // Lấy chi tiết phiếu nhập theo ID
router.post("/", dhDetailController.create); // Tạo một chi tiết phiếu nhập mới

// Bạn có thể thêm các tuyến dẫn khác cho cập nhật và xóa ở đây

module.exports = router;
