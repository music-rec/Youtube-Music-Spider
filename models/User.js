////////////////////////////////////////////////////////////////////////////////
// import ORM instance and Datatypes
const Sequelize = require('sequelize');
var myORM = require('../libraries/ORM.js');
const ORM = new myORM();
const DataTypes = Sequelize.DataTypes;
////////////////////////////////////////////////////////////////////////////////
// import main model
var User = require("./baseStructure/Users.js")(ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// import additional models (for define relations)
var Video = require("./baseStructure/Videos.js")(ORM.sequelize, DataTypes);
var FavoriteVideos = require("./baseStructure/FavoriteVideos.js")(ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// define relation
User.belongsToMany(Video, {
  through: FavoriteVideos,
  foreignKey: 'FKUserId',
  otherKey: 'FKVideoId'
});
////////////////////////////////////////////////////////////////////////////////
// export model with structure and relations
module.exports = User;
////////////////////////////////////////////////////////////////////////////////