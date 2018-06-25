'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ProdutoConsumoSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    consumo: {
        type: Schema.ObjectId,
        ref: 'Consumo'
    },
    valorAplicado: {
        type: Number
    },
    quantidade: {
        type: Number
    },
    produto: {
        type: Schema.ObjectId,
        ref: 'produto'
    },
    status: {
        type: [{
            type: String,
            enum: ['solicitado', 'atendido', 'estornado']
        }],
        default: ['solicitado']
    }
});

mongoose.model('ProdutoConsumoTeste', ProdutoConsumoSchema);
