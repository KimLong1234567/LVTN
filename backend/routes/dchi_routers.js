const express = require("express");
const router = express.Router();
const dchiController = require("../controller/dchi_controller");

router.get("/", dchiController.getAll); // Lấy tất cả chi tiết phiếu nhập
router.get("/:id", dchiController.getById); // Lấy chi tiết phiếu nhập theo ID
router.post("/", dchiController.create); // Tạo một chi tiết phiếu nhập mới

// Bạn có thể thêm các tuyến dẫn khác cho cập nhật và xóa ở đây

module.exports = router;
