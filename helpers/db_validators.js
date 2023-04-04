const { default: mongoose } = require("mongoose");
const Role = require("../models/role");
const {Usuario, Categoria, Producto} = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD.`);
  }
};

const emailExiste = async (correo = '') => {
  const emailE = await Usuario.findOne({ correo });
  if (emailE) {
    throw new Error(`El email ${correo} ya existe.`)
  }
};


const userExistById = async( id ) =>{
  try {
      const existe = await Usuario.findById(id);

  } catch (error) {
      throw new Error(`El id ${id} no es valido`);
      
  }
         
}

const existeCategoriaPorId = async  (id) => {
  const existeCategoria = await Categoria.findById(id)
  if (!existeCategoria) {

    throw new Error (`El id no existe ${id}`)
    
  }
}
const existeProductoPorId = async  (id) => {
  const existeProducto = await Producto.findById(id)
  if (!existeProducto) {

    throw new Error (`El id no existe ${id}`)
    
  }
}


module.exports = {
  esRoleValido,
  emailExiste,
  userExistById,
  existeCategoriaPorId,
  existeProductoPorId
};
