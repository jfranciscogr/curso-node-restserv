const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')


const validarJWT = async ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        const usuario= await Usuario.findById(uid);

        if( !usuario  ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }


        if( !usuario.estado  ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        req.usuario= usuario;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }



    // TODO OK!
    next();
}


module.exports = {
    validarJWT
}

