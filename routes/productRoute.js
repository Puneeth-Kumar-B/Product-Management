const express = require("express");
const { Validations } = require("../validations/productValidator");
const router = express.Router();
const Controller = require('../controllers/productController')


router.post("/add", Validations, Controller.addProduct)
router.get('/search', Controller.searchProduct)
router.get('/:id', Controller.getProduct)
router.put('/update/:id', Validations, Controller.updateProduct)
router.delete('/delete/:_id', Controller.softDeleteProduct)
router.get('/find/:_id', Controller.findDeletedProducts)
router.get('/restore/:_id', Controller.restoreDeletedProducts)


module.exports = router;