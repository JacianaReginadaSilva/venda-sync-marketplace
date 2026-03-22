const Datastore = require('nedb-promises');
const path = require('path');

const Produto = Datastore.create({
    // Sobe dois níveis (models -> src -> raiz) e entra em data
    filename: path.join(__dirname, '../../data/produtos.db'),
    autoload: true
});

module.exports = Produto;