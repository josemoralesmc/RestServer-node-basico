const { response } = require('express')

const usuariosGet = (req, res = response) => {

  const {q, nombre} = req.query

    res.json({
        msg: "get API - controlador",
        q, nombre
    })
  }

  const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "put API - controlador",
        id     
    })
  }

  const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: "Post API - controlador",
        nombre, edad
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Delete API - controlador"
    })
  }

  const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "Patch API - controlador"
    })
  }



  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
  }