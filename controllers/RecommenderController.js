////////////////////////////////////////////////////////////////////////////////
var RecommenderHelper = require('./helpers/RecommenderHelper.js');
var VideosController = require('./VideosController.js');
var AjaxRequestClass = require('../libraries/AjaxRequest.js');
var AjaxRequest = new AjaxRequestClass();

var ViewsHistory = require("../models/ViewsHistory.js");
var User = require("../models/User.js");
var Video = require("../models/Video.js");
var Channel = require("../models/Channel.js");
const Sequelize = require('sequelize');
////////////////////////////////////////////////////////////////////////////////

// module.exports = class TestController {
module.exports = {
  // fvitali get request
  vitali(id) {
    return new Promise((resolve, reject) => {
      var url = "http://site1825.tw.cs.unibo.it/TW/globpop?id=" + id;
      AjaxRequest.jsonRequest(url, 'GET', {}).then(function (vitaliResponse) {
        var promises = [];
        vitaliResponse.recommended.forEach(video => {
          promises.push(VideosController._getVideoInfo(null, video.videoID));
        });
        Promise.all(promises)
          .then(videosData => {
            resolve(videosData);
          })
          .catch(error => {
            console.log("%j", error);
            resolve(null);
          });
      }).catch((error) => {
        console.log("%j", error);
        resolve(null);
      });
    });
  },
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  localRelativePopularity(response, userId, videoId) {
    return new Promise((resolve, reject) => {
      ViewsHistory.findAll({
        where: {
          FKUserId: userId
        },
        order: [
          ['id', 'ASC']
        ]
      }).then(results => {
        var promises = [];
        var videoFounded = RecommenderHelper.localRelativePopularityCounter(results, videoId);
        videoFounded.forEach(video => {
          promises.push(VideosController.getVideoById(video.videoId));
        });
        Promise.all(promises)
          .then(videosData => {
            resolve(videosData);
          })
          .catch(error => {
            console.log("%j", error);
            reject(error);
          });
      }).catch((error) => {
        console.log("%j", error);
        reject(error);
      });
    });
  },
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  random(response) {
    return new Promise((resolve, reject) => {
      Video.findAll({
        order: Sequelize.literal('rand()'), 
        limit: 5
      }).then(function (videoRandom) {
        resolve(videoRandom);
      }).catch(function (error) {
        console.log("%j", error);
        reject(error);
      });
    });
  },
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  recent(response, userId) {
    return new Promise((resolve, reject) => {
      // ViewsHistory.findAll({ 
      //   where: {
      //     FKUserId: userId
      //   },
      //   order: [['updatedAt', 'DESC']],
      //   limit: 15 
      // }).then(function (videoRecent) {
      //   resolve (videoRecent);
      // }).catch(function (error) {
      //   reject(error);
      // });
      Video.findAll({
        include: [{
            model: User,
            where: {
              id: userId
            }
          },
          {
            model: Channel
          }
        ],
        limit: 15,
        order: [
          ['updatedAt', 'DESC']
        ],
        group: ['youtube_id']
      }).then(function (videoRecent) {
        resolve(videoRecent);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};

var VideosController = require('./VideosController.js');