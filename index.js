var mysql = require('mysql');
var request = require('request');
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'timedOut', database: 'timedOut'});
var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);

timedOutAPI.searchGB('lol', function(err, result) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(JSON.stringify(result));
  }
})

// var query = `%super high impact%`;
// timedOutAPI.search(query, function(err, result) {
//   if(err) {
//     console.log(err)
//   }
//   else {
//     console.log(result.length < 3);
//     var searchResult = (JSON.stringify(result));
//     // console.log(searchResult)
//     // if(searchResult.COUNT(*) < 3) {
//     //   console.log('search GB');
//     // }
//     // else{
//     //   console.log('return our result')
//     // }
//   }
// })



// timedOutAPI.test({
//   id: '557',
//   username: 'megamon',
//   password: '20xx',
//   email: 'mega@mon.com'
// }, function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//     connection.end();
//   }
// })
