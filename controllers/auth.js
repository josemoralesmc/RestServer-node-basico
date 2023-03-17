const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const {correo, password} = req.body

    try {

        // Verificar si email existe

        const usuario = await Usuario.findOne({correo})
         if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario'
            })
         }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - false'
            })
         }

        // Verificar contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar JWT

        const token = await generarJWT(usuario.id)


        res.json({
           usuario,
           token
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal.'
        })
    }


    res.json({
        msg: "login"
    })
}

const googleSignIn = async (req, res = response) => {

    const {id_token} = req.body

    try {
        const {nombre, img, correo} = await googleVerify(id_token) 

        let usuario = await Usuario.findOne({correo})

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ";P",
                img,
                rol: "USER_ROL",
                google: true
              };
            usuario = new Usuario(data)
            await usuario.save()
        } 

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id)



        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}



module.exports = {
    login,
    googleSignIn
}
