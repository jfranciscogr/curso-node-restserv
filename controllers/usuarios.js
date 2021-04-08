const { response} =require('express');

const usuario={};

usuario.getUsuarios = (req, res = response )=> {
    const {q, nombre='No name', apikey } = req.query;
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey
    });
}

usuario.putUsuarios= (req,res=response)=> {
    //const id = req.params.id;
    const { id } = req.params;
    res.json({
        msg: 'put API',
        id
    });
}

usuario.postUsuario = (req, res=response)=> {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API',
        nombre,
        edad,
    });
}

usuario.deleteUsuario= (req,res=response)=> {
    const { id } = req.params;
    res.json({
        msg: 'delete API',
        id
    });
}

module.exports=usuario;