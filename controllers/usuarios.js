const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0} =req.query;
    // const usuarios= await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    //
    // const total = await Usuario.countDocuments({estado: true});

    const [ total, usuarios ] =await Promise.all([
            Usuario.countDocuments({estado: true}),
            Usuario.find({estado: true})
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);
    //guardar en la BD
    await usuario.save();
    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    //const usuarioAutenticado  = req.usuario;

    const usuario = await Usuario.findByIdAndUpdate(id,  { estado: false });
    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}