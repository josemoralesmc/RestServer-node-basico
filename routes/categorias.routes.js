const { Router } = require('express')
const { body, check } = require('express-validator')
const { crearCategoria, ObtenerCategorias, ObtenerCategoria, actualizarCategoria, BorrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db_validators')
const { validarJWT, esAdminRole } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

// Todas las categorias - publico
router.get('/', ObtenerCategorias)

// Categoria por id - publicado
router.get('/:id',[
    check ('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
] ,ObtenerCategoria)

// Crear categoria - privado con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria) 

// Actualizar categoria - privado con token
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

] ,actualizarCategoria)

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check ('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],BorrarCategoria)


module.exports = router