// dependencies
import express from "express";
const router = express.Router();
//controllers
import { SaveProduct, GetProduct, EditProduct, DeleteProduct } from "./server/controllers/product";
import { Login } from "./server/controllers/auth";

//|--------------------------------- APIS -------------------------------------|
router.post("/api/product", SaveProduct);
router.get("/api/product", GetProduct);
router.put("/api/product", EditProduct);
router.delete("/api/product/:id", DeleteProduct);
router.post("/api/auth/login",Login);

//|------------------------------------- Views---------------------------------|
router.get("/*", (req, res) => {
    const routeBundle = `http://${req.headers.host}/bundle.js`;
    res.render("index", {bundle: routeBundle});
});

export default router;
