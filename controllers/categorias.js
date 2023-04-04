const { response } = require("express");
const {Categoria} = require('../models')

// ObtenerCategorias - paginado - populate - total

const ObtenerCategorias = async (req, res = response) => {
    const { limit = 5, desde = 0} = req.query
    const query = {estado: true}

    const [total, categoria] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
          .populate('usuario', 'nombre')
          .skip(Number(desde))
          .limit(Number(limit))
    ])

    res.json({
        total,
        categoria
    })

}

// ObtenerCategoria - populate {}

const ObtenerCategoria = async (req, res = response) => {

    const {id} = req.params

    const categoriaDB = await Categoria.findById(id).populate('usuario', 'nombre')

    res.json(
        categoriaDB
    )

}

const crearCategoria = async (req, res = response) => {
     
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if (categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    await categoria.save()

    res.status(201).json(categoria)

}

// Actualizar categoria

const actualizarCategoria = async (req, res = response ) =>{
    const {id} = req.params

    const {estado, usuario, ...data} = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id


    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.json(categoria)

}

// Borrar Categoria estado: false

const BorrarCategoria = async (req, res = response) =>{

    const {id} = req.params

    const actualizadoFalse = await Categoria.findByIdAndUpdate(id, {estado:false}, {new: true})

    res.json(actualizadoFalse)
}




module.exports = {
    crearCategoria,
    ObtenerCategorias,
    ObtenerCategoria,
    actualizarCategoria,
    BorrarCategoria
}