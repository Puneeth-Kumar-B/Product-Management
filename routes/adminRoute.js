const express = require('express')
const { adminValidations } = require("../validations/adminValidator");
let validator = require('express-joi-validation').createValidator({ passError: false });
const router = express.Router()

const adminController = require('../controllers/adminController')

router.get("/", (req, res) => {
    res.send(`(: Hello World :)`);
});
router.post('/register', validator.body(adminValidations, { abortEarly: false }), adminController.register)
router.post('/login', adminController.login)

module.exports = router