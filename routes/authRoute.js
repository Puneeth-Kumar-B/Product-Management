const express = require('express')
const { userValidations } = require("../validations/authValidator");
let validator = require('express-joi-validation').createValidator({ passError: false });
const router = express.Router()

const authController = require('../controllers/authController')

router.get("/", (req, res) => {
    res.send(`(: Hello World :)`);
});
router.post('/register', validator.body(userValidations, { abortEarly: false }), authController.register)
router.post('/login', authController.login)

module.exports = router