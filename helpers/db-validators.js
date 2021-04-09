const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol='') =>{
    const existeRol=await Role.findOne({rol});
    if (!existeRol) {
        throw  new Error(`El rol ${ rol } no está registrado en la  BD`)
    }
}

//verificar si el correo existe

const siExisteEmail = async (correo='') =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw  new Error(`El correo ${ correo } ya está registrado en la  BD`)
    }

}

const ExisteUsuarioId = async (id='') =>{
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw  new Error(`El usuario no está registrado en la  BD`)
    }

}

module.exports = {
    esRoleValido,
    siExisteEmail,
    ExisteUsuarioId
}