const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { isValidObjectId } = require("mongoose");

const coleccionesPermitidas = ["categorias", "usuarios", "productos", "roles"];

const busucarUsuarios = async (termino = "", res = response) => {
  const esMongoId = isValidObjectId(termino);
  if (esMongoId) {
   const usuario = await Usuario.findById(termino);
   return res.json({
    results: usuario ? [usuario] : []
   })
  }

  const regex = new RegExp(termino, 'i')

  const usuarios = await Usuario.find({ 
    $or: [{nombre: regex }, {correo: regex }],
    $and: [{ estado: true }]
  });
  res.json({
    results: usuarios
  }); 
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }


const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino)

    if (esMongoId) {
        const categoria = await Categoria.findById(termino)

        return res.json({
          results: categoria ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({nombre: regex, estado: true})
    res.json({
      results: categorias
    })

}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino)

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')

        return res.json({
          results: producto ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre')
    res.json({
      results: productos
    })

}


  switch (coleccion) {
    case "usuarios":
      busucarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res)
    break;
    case "productos":
      buscarProductos(termino, res)
      break;

    default:
      res.status(500).json({ msg: "Hacer esta busqueda" });
  }
};

module.exports = {
  buscar,
};
