const { response } = require('express');



const esAdminRole = ( req, res = response, next ) => {

    try {

        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        const {rol,nombre}= req.usuario;

        if( rol !== 'ADMIN_ROLE'  ) {
            return res.status(401).json({
                ok: false,
                msg: `${nombre} no es administrador - No puede hacer esto`
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    // TODO OK!
    next();
}

const tieneRol =  ( ...role ) => {


     return (req, res = response, next) =>{
         if (!req.usuario) {
             return res.status(500).json({
                 ok: false,
                 msg: 'Se quiere verificar el role sin validar el token primero'
             });
         }

         if (!role.includes(req.usuario.rol)) {
             return res.status(401).json({
                 ok: false,
                 msg: `El servicio requiere uno de estos roles ${role}`
             });
         }

         // TODO OK!
         next();
     }
        // if (!req.usuario) {
        //     return res.status(500).json({
        //         ok: false,
        //         msg: 'Se quiere verificar el role sin validar el token primero'
        //     });
        // }
        //
        // const {rol,nombre}= req.usuario;
        //
        // if( rol !== 'ADMIN_ROLE'  ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: `${nombre} no es administrador - No puede hacer esto`
        //     });
        // }


}

module.exports = {
    esAdminRole,
    tieneRol
}