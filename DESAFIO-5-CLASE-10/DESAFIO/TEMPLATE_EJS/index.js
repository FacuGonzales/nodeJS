const COLORS = require('colors');
const APP = require('./app');

const PORT = 8080;

const _server = APP.listen(PORT, () => console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${_server.address().port}`.green));

_server.on('error', error => console.log(`ERROR EN EL SERVIDOR: ${error}`.red));