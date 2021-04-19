
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const {googleVerify}=require( '../helpers/google-verify');

const login = async(req, res = response) => {
    try {
        const { correo, password} = req.body;
        const usuario= await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correcto'
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correcto'
            });
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correcto'
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id, usuario.nombre );
        return res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSigni= async (req, res)=>{
    const {id_token } = req.body;
    try {

        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario= new Usuario(data)
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT( usuario.id, usuario.nombre );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token no es reconico'
        })
    }

}

module.exports = {
    login,
    googleSigni
}