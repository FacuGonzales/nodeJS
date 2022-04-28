const MONGOOSE = require('mongoose');

const DB_CONNECT = async () => {
    try {
        await MONGOOSE.connect(process.env.MONGO_URI, {});
    } catch (error) {
        console.error(error);
    }
}

module.exports = DB_CONNECT;