var mysql = require('mysql');
var request = require('request');
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'timedOut', database: 'timedOut'});
var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);
var express = require('express');
var app = express();


// search our DB
// var query = ''
// timedOutAPI.searchGames(query, function(err, result) {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

//search GB
// var query = ''
// timedOutAPI.searchGB(query, function(err, result) {
//   if(err) {
//     console.log(err)
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

// //combo search
// var query = 'rocket league'
// timedOutAPI.searchGames(query, function(err, result) {
//   if(err) {
//     console.log(err)
//   }
//   else {
//     if(result.length === 0) {
//       timedOutAPI.searchGB(query, function(err, res) {
//         if(err) {
//           console.log(err)
//         }
//         else {
//           console.log(JSON.stringify(res));
//         }
//       })
//     }
//     else {
//       console.log(JSON.stringify(result));
//     }
//   }
// })

//list games
// timedOutAPI.listGames(function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

// //list parties
// var gameId = '58'
// timedOutAPI.listParties(gameId, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//     }
// })

// create party
var date = Date.now();
date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);

// timedOutAPI.createParty({
//   startTime: date,
//   endTime: undefined,
//   name: 'the greatest party ever made',
//   gameId: 58,
//   size: 10,
//   userId: 1,
//   username: 'user1'
// }, function(err, result) {
//   if(err) {
//     console.log(err)
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

//edit party
// timedOutAPI.editParty({
//   startTime: date,
//   endTime: undefined,
//   name: 'the second greatest party ever made',
//   gameId: 58,
//   size: 10,
//   partyId: 18,
// }, function(err, result) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log(JSON.stringify(result));
//     }
//   }
// )

//join party
timedOutAPI.joinParty({
  userId: 4,
  partyId: 5
}, function(err, result) {
  if(err) {
    console.log(err)
  }
  else {
    console.log(JSON.stringify(result));
  }
})