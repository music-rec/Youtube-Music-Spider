////////////////////////////////////////////////////////////////////////////////

var Genre = require("../models/Genre.js");
var Promise = require('bluebird');
var YoutubeApi = require('../libraries/YoutubeApi.js');
// var database = new mySqlDB();
const youtubeApi = Promise.promisifyAll(new YoutubeApi());

////////////////////////////////////////////////////////////////////////////////

var self = module.exports = {

  findOrCreateGenre(name, url) {
    return new Promise((resolve, reject) => {
      var channelObject = {
        name: name,
        url: url
      };
      Genre.findOrCreate({
        where: {
          name: channelObject.name,
          url: channelObject.url
        },
        defaults: {
          name: channelObject.name,
          url: channelObject.url
        }
      }).spread( function(genreCreated, created){
        resolve(genreCreated);
      });
    });
  }

};