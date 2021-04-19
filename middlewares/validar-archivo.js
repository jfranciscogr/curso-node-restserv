const { response } = require('express');


const validarArchivo = async ( req, res = response, next ) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            res.status(400).json({msg: 'No hay archivo en la peticion'});
            return;
        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }



    // TODO OK!
    next();
}


module.exports = {
    validarArchivo
}

