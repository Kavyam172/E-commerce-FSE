const dbConnection = require("../config/dbConnect");
const { uploadImage} = require("../utils/cloudinaryUtils");
const Product = require("../models/product");
const fs = require("fs");

async function getProducts(req, res) {
    const product = new Product();
    try {
        const products = await product.getProducts();
        res.status(200).json(products[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

async function getProductById(req, res) {
    const product = new Product();
    try {
        const products = await product.getProductById(req.params.id);
        res.json(products[0][0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function createProduct(req, res) {
    const product = new Product();
    try {
        const products = product.createProduct(req.body);
        res.json(products[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProduct(req, res) {
    const product = new Product();
    try {
        const products = product.updateProduct(req.params.id, req.body);
        res.json(products[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addImage(req,res) {
    const product = new Product();
    try {
        const imageUrl = await uploadImage(`./uploads/${req.file.filename}`)
        fs.unlink(`../uploads/${req.file.filename}`, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
        const { productid, isPrimary } = req.body;
        const products = product.addProductImage(productid, imageUrl, isPrimary);
        res.json(products[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    const product = new Product();
    try {
        const products = product.deleteProduct(req.params.id);
        res.json(products[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addImage
}