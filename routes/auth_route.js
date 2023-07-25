const express = require('express')

const router = express.Router()

const controller = require('../controller/auth_controller')
const {check} = require('express-validator')

router.post('/registration', [
    check('nickname', "incorrect username")
    .notEmpty()
    .isLength({min: 6, max: 16}),
    check('email', "incorrect email")
    .notEmpty()
    .trim()
    .isEmail(),
    check('password', "incorrect password")
    .notEmpty()
    .isLength({min: 8, max: 24}),
    check('age', "Incorrect age format")
    .optional()
    .isInt(),
    check('phone', "Incorrect phone format")
    .optional()
    .isMobilePhone()
], (req, res) => controller.registration(req, res))
router.post('/login', (req, res) => controller.login(req, res))

module.exports = router