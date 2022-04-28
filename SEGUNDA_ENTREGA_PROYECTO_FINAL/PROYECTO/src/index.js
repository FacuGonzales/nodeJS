const COLORS = require('colors');
const APP = require('./app');
const DOTENV = require('dotenv');
const PORT = process.env.PORT || 8080;
const DB_CONNECT = require('./config/db');

DOTENV.config();

const launchServer = async () => {
    DB_CONNECT().catch((err) => console.error(err));

    const _server = APP.listen(PORT, () => console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${_server.address().port}`.green));

    _server.on('error', error => console.error(`ERROR EN EL SERVIDOR: ${error}`));
};

launchServer().catch((err) => console.error(err));

