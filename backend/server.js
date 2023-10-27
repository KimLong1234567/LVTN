const express = require("express")
const cors = require("cors");

const app = express()
app.use(cors());

require('dotenv').config()

const prod_router = require("./routes/product_routes")
const cate_router = require("./routes/cate_routers")
const user_router = require("./routes/user_routers")
const order_router = require("./routes/orders_routers")
const pet_router = require("./routes/pet_routers")
const admin_router = require("./routes/admin_routers")
const cv_router = require("./routes/chucvu_routers")
const pn_router = require("./routes/pnhap_routers")
const contacts_router = require("./routes/contact_routers")
const comments_router = require("./routes/comments_routers")
const ctpn_router = require("./routes/ctpn_routers")
const dchi_router = require("./routes/dchi_routers")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/products", prod_router)
app.use("/api/cate", cate_router)
app.use("/api/users", user_router)
app.use("/api/orders", order_router)
app.use("/api/pets", pet_router)
app.use("/api/admins", admin_router);
app.use("/api/cv", cv_router);
app.use("/api/pn", pn_router);
app.use("/api/contacts", contacts_router);
app.use("/api/comments", comments_router);
app.use("/api/ctpn", ctpn_router);
app.use("/api/dchi/", dchi_router);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}.`);
})