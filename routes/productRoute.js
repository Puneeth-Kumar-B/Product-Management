const express = require("express");
const { Validations } = require("../validations/productValidator");
const router = express.Router();
const Controller = require('../controllers/productController')
const upload = require('../middleware/upload')


router.post("/upload", function(req, res) {
    upload.single('uploadImages')(req, res, function(error) {
        if (error) {
            return res.json({ error: "Error occured while uploading image" })
        }
        res.status(200).json({ message: "Image Uploaded Successfully", ImageUrl: `http://localhost:8000/${req.file.path}` })
    })
})


router.post("/add", Validations, Controller.addProduct)
router.get('/search', Controller.searchProduct)
router.get('/:id', Controller.getProduct)
router.put('/update/:id', Validations, Controller.updateProduct)
router.delete('/delete/:_id', Controller.softDeleteProduct)
router.get('/find/:_id', Controller.findDeletedProducts)
router.get('/restore/:_id', Controller.restoreDeletedProducts)


module.exports = router;
