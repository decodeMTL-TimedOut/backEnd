var mysql = require('mysql');
var request = require('request');
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'timedOut', database: 'timedOut'});
var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);
var express = require('express');
// var app = express();

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
// var query = 'justice league'
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
// var gameId = '42'
// timedOutAPI.listParties(gameId, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//     }
// })

// create party
// var date = Date.now();
// date = new Date();
// date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2) + ' ' + ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);

// timedOutAPI.createParty({
//   startTime: '2017-02-27 00:00:00',
//   endTime: '2017-02-28 00:00:00',
//   name: 'I was saying boo urns',
//   gameId: 42,
//   size: 4,
//   userId: 3
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
//   startTime: '2017-02-28 00:00:00',
//   endTime: '2017-03-01 00:00:00',
//   name: 'boo this party is changed',
//   gameId: 42,
//   size: 4,
//   partyId: 21,
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
// timedOutAPI.joinParty({
//   partyId: 21,
//   userId: 2
// }, function(err, result) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(JSON.stringify(result));
//   }
// })

//leave/kick
// timedOutAPI.leaveParty({
//   partyId: 25,
//   userId: 3
// }, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

//delete party
// timedOutAPI.deleteParty({
//   partyId: 19
// }, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

//confirm partyId
// timedOutAPI.confirmParty({
//   partyId: 21
// }, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })

//search party
// timedOutAPI.searchParty({
//   query: 'boo',
//   size: 4,
//   startTime: '2017-02-23 00:00:00',
//   gameId: 42,
// }, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(result));
//   }
// })
