require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username:  process.env.DB_USER,
    password: process.env.DB_PASS,
});

const URLs = db.define('urls', {
    id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    code: {
        type: DataTypes.STRING(7),
        unique: true
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = {
    db,
    URLs
};