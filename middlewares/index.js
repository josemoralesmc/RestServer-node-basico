const   validarCampos  = require('../middlewares/validar-campos')
const  validarJWT  = require('../middlewares/validar-jsw')
const  validaRoles  = require('../middlewares/validar-roles')
const validarArchivoSubir = require('./validar-archivo')


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir
}