const { response, request } = require('express');
const { Producto } = require('../models');

const obtenerProductos = async (req = request, res = response) => {


    const { limite = 5, desde = 0} =req.query;
    const query= {estado: true};

    const [ total, producto ] =await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        producto,

    });
}

const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre')
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        producto
    });
}

const crearPreoducto = async(req, res = response) => {
    const {estado, usuario, ...body}   = req.body

    const data ={
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario:req.usuario._id,
    }
    const producto = new Producto(data);
    await producto.save();
    res.json({
        msg: 'post API - productoPost',
        producto
    });
}

const actualizarPreoducto = async(req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data}   = req.body;

    if (data.nombre){
        data.nombre= data.nombre.toUpperCase();
    }
    data.usuario=req.usuario._id;


    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});


    res.json({
        producto,
    });
}

const borrarProducto = async(req, res = response) => {
    const { id } = req.params;

    //const usuarioAutenticado  = req.usuario;

    const producto = await Producto.findByIdAndUpdate(id,  { estado: false }, {new: true});
    res.json(producto);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearPreoducto,
    actualizarPreoducto,
    borrarProducto
}