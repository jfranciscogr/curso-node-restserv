const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

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
    // if (!existeId.estado) {
    //     throw  new Error(`El usuario no está registrado en la  BD`)
    // }

}

const ExisteCategoriaId = async (id='') =>{
    const existeId = await Categoria.findById(id);

    if (!existeId) {
        throw  new Error(`La categoria no está registrado en la  BD`)
    }
    // if (!existeId.estado) {
    //     throw  new Error(`El usuario no está registrado en la  BD`)
    // }

}

const siExisteCategoria = async (categoria='') =>{
    const nombre= categoria.toUpperCase()

    const existeCategoria=await Categoria.findOne({nombre});
    if (existeCategoria) {
        throw  new Error(`La categoria ${ nombre } ya esta registrada en la  BD`)
    }
}

const siExisteProducto = async (producto='') =>{
    const nombre= producto.toUpperCase()

    const existeProducto=await Producto.findOne({nombre});
    if (existeProducto) {
        throw  new Error(`La producto ${ nombre } ya esta registrada en la  BD`)
    }
}

const ExisteProductoId = async (id='') =>{
    const existeId = await Producto.findById(id);

    if (!existeId) {
        throw  new Error(`El producto no está registrado en la  BD`)
    }
    // if (!existeId.estado) {
    //     throw  new Error(`El usuario no está registrado en la  BD`)
    // }

}

const coleccionesPermitidas =(coleccion='', colecciones=[])=>{
    const incluida = colecciones.includes(coleccion);
    if (!incluida){
        throw  new Error(`la coleccion ${coleccion} no es permitida`)
    }

    return true
}

module.exports = {
    esRoleValido,
    siExisteEmail,
    ExisteUsuarioId,
    siExisteCategoria,
    ExisteCategoriaId,
    siExisteProducto,
    ExisteProductoId,
    coleccionesPermitidas
}