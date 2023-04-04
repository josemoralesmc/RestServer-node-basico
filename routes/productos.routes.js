const { Router } = require('express')
const { body, check } = require('express-validator')
const { ObetenerProductos, CrearProducto, ObtenerProducto, ActualizarProducto, BorrarProducto  } = require('../controllers/productos')
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db_validators')
const { validarJWT, esAdminRole } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

// Todas los productos - publico
router.get('/', ObetenerProductos)

// Producto por id - publicado
router.get('/:id',[
    check('id', 'El id no es de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] , ObtenerProducto)

// Crear Producto - privado con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'El id no es de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], CrearProducto) 

// Actualizar categoria - privado con token
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,ActualizarProducto)

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],BorrarProducto)


module.exports = router