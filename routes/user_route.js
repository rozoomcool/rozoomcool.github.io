const express = require('express')

const router = express.Router()

const controller = require('../controller/user_controller')
const authMiddleware = require('../middleware/auth_middleware')
const roleMiddleware = require('../middleware/role_middleware')
const canChangeMiddleware = require('../middleware/can_change_middleware')
const {check} = require('express-validator')


// router.post("/create", (req, res) => controller.createUser(req, res))


router.get('/:id', roleMiddleware(['ADMIN', 'TEACHER', 'STUDENT']), (req, res) => controller.findUserById(req, res))
router.get('/', authMiddleware, (req, res) => controller.getCurrentUser(req, res))

router.put('/', roleMiddleware(['STUDENT', 'ADMIN', 'TEACHER']), [
    check('nickname', "incorrect nickname")
    .optional()
    .isLength({min: 6, max: 16}),
    check('email', "incorrect email")
    .optional()
    .trim()
    .isEmail(),
    check('password', "incorrect password")
    .optional()
    .isLength({min: 8, max: 24}),
    check('age', "Incorrect age format")
    .optional()
    .isInt(),
    check('phone', "Incorrect phone format")
    .optional()
    .isMobilePhone()
], (req, res) => controller.updateUser(req, res))

module.exports = router;