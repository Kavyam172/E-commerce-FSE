const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct,addImage } = require('../controllers/productController');
const upload = require('../utils/multerUtils');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/addImage',upload.single('image'), addImage); 

module.exports = router;