//1. mempunyai deklrasi const Sequelize
const Sequelize = require("sequelize");
const db = require("../config/db");

//2. const User
const User = db.define(
    "user",
    {
        username: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING},
    },
    {
        //freeze tabel supaya di nama akhiran tidak ditambahkan s
        freezeTableName: true 
    }
);
// export 
module.exports = User;