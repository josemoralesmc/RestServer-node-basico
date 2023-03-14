const { Schema, model } = require('mongoose');


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    correo: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es Obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
 

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id,...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}
 
 
 

module.exports = model('Usuario', UsuarioSchema);
