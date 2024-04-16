const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connection status: online');
    } catch (error) {
        console.log('Database connection status: offline // Connection error: ', error);
    }
};

module.exports = { connectDB };