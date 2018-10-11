////////////////////////////////////////////////////////////////////////////////
// import ORM instance and Datatypes
const Sequelize = require('sequelize');
var myORM = require('../libraries/ORM.js');
const ORM = new myORM();
const DataTypes = Sequelize.DataTypes;
////////////////////////////////////////////////////////////////////////////////
// import main model
var Band = require("./baseStructure/Bands.js")(ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// import additional models (for define relations)
var Artist = require("./baseStructure/Artists.js")(ORM.sequelize, DataTypes);
var ArtistsAndBands = require("./baseStructure/ArtistsAndBands.js")(ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// define relation
Band.belongsToMany(Artist, {
  through: ArtistsAndBands,
  foreignKey: 'FKBandId',
  otherKey: 'FKArtistId'
});
////////////////////////////////////////////////////////////////////////////////
// export model with structure and relations
module.exports = Band;
////////////////////////////////////////////////////////////////////////////////