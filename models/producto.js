const {Schema, model } = require('mongoose');

const ProductoSchema = Schema({
        nombre: {
            type: String,
            required:[true, 'El nombre de la categoria es obligatorio'],
        },
        estado: {
            type: Boolean,
            default: true,
            required:true,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        precio: {
            type: Number,
            default: 0,
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        },
        descripcion: { type: String },
        disponible: { type: Boolean, default: true },
        img: { type: String },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

ProductoSchema.methods.toJSON = function() {
    const {estado,_id, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', ProductoSchema);