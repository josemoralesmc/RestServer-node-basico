const { Router } = require('express')
const { body, check, param } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user')
const { esRoleValido, emailExiste,userExistById } = require('../helpers/db_validators')
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares')



const router = Router()

router.get('/', usuariosGet)
  
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExistById),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPut)

router.post('/', [
    body('correo').custom(emailExiste),
    body('nombre','El nombre no es valido.').not().isEmpty(),
    body('password','El password debe de ser mas de 6 letras.').isLength({min: 6}),
    body('rol').custom(esRoleValido),
    validarCampos
],usuariosPost)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    param('id', 'No es un id valido').isMongoId(),
    param('id').custom(userExistById),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)



module.exports = router