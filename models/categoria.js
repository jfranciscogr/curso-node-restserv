const {Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
        }

    },
    {
        versionKey: false,
        timestamps: true
    }
);

CategoriaSchema.methods.toJSON = function() {
    const {estado,_id, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);