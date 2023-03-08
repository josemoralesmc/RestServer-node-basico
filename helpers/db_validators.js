const { default: mongoose } = require("mongoose");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = {
  esRoleValido,
  emailExiste,
  userExistById
};
