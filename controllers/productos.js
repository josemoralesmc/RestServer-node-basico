const { response } = require("express");
const { Producto } = require("../models");

const ObetenerProductos = async (req, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, producto] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    producto,
  });
};

const CrearProducto = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { precio, descripcion, categoria } = req.body;
  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto con el nombre ${nombre}, ya existe`,
    });
  }

  const data = {
    nombre,
    precio,
    descripcion,
    usuario: req.usuario._id,
    categoria
  };

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};


const ObtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate('usuario', 'nombre');

  res.status(200).json(producto);
}

const ActualizarProducto = async (req, res = response) => { 
  const { id } = req.params;
  const {estado, usuario, ...data} = req.body
  data.nombre = data.nombre.toUpperCase()

  const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

  res.json(producto);
}

const BorrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new: true})

  res.json(producto);
}


module.exports = {
  ObetenerProductos,
  CrearProducto,
  ObtenerProducto,
  ActualizarProducto,
  BorrarProducto
};
