const { Router } = require('express')
const { body, check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login', [
    body('correo', "El correo es obligatorio").isEmail(),
    body('password', "La contraseña es obligatorio").not().isEmpty(),
    validarCampos
],login)

router.post('/google', [
    body('id_token', "id_token es necesario").notEmpty(),
    validarCampos
], googleSignIn)


module.exports = router