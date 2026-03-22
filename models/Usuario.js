const datastore = require('nedb-promises');
const path = require('path');

// Cria o arquivo de banco de dados na pasta data
const db = datastore.create(path.join(__dirname, '../../data/usuarios.db'));

module.exports = db;