const { Router, response } = require('express')
const { body, check } = require('express-validator')
const { validarCampos, validarArchivoSubir } = require('../middlewares/index')
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagen } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers/db_validators')

const router = Router()

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router