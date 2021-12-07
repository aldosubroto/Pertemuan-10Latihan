// mengkoneksikan database dengan nodejs
const sequelize = require("sequelize");

const db = new sequelize("crudnodejs","root","",{
    dialect: "mysql"
});

db.sync({});

// agar bisa dipakai di nodejs yang lainnya 
module.exports = db;