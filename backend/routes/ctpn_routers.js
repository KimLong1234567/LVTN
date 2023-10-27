const express = require("express");
const router = express.Router();
const detailController = require("../controller/ctpn_controller");

router.get("/", detailController.getAll); // Lấy tất cả chi tiết phiếu nhập
router.get("/:id", detailController.getById); // Lấy chi tiết phiếu nhập theo ID
router.post("/", detailController.create); // Tạo một chi tiết phiếu nhập mới

// Bạn có thể thêm các tuyến dẫn khác cho cập nhật và xóa ở đây

module.exports = router;
