var mysql = require('mysql');
var request = require('request');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'leblancbryan',
  password: '',
  database: 'timedOut',
  multipleStatements: true
});
var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

app.get('/main', function(request, response) {
  timedOutAPI.listGames(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({res}));
    }
  });
});

// app.get('/search', function(request, response) {
//   timedOutAPI.searchGB(request.query.q, function(err, result) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       response.send(JSON.stringify({result}));
//     }
//   });
// });

app.get('/search', function(request, response) {
  var query = request.query.q;
  timedOutAPI.searchGames(query, function(err, res) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(res.length);
      if(res.length < 11) {
        timedOutAPI.searchGB(query, function(err, res) {
          if(err) {
            console.log(err);
          }
          else {
            console.log(res);
            console.log('sending', JSON.stringify(res));
            response.send(JSON.stringify({res}));
          }
        });
      }
      else {
        console.log(res);
        console.log('instead sending', JSON.stringify(res));
      response.send(JSON.stringify({res}));
      }
    }
  });
});

app.get('/games/:id', function(request, response) {
  timedOutAPI.listParties(request.params.id, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({result}));
    }
  });
});

// app.get('/games/:id/parties/:partyId', function(request, response) {
//   timedOutAPI.showParty({
//     partyId: request.params.partyId,
//     gameId: request.params.id
//   });
// });

app.post('/games/:id/parties/create', function(request, response) {
  console.log(request.body);
  timedOutAPI.createParty({
    startTime: request.body.startTime,
    endTime: request.body.endTime,
    name: request.body.gameName,
    gameId: request.params.id,
    size: request.body.numOfPlayers,
    userId: request.body.userId,
    username: request.body.username,
      pvp: request.body.tags.pvp,
      pve: request.body.tags.pve,
      exp: request.body.tags.exp,
      farm: request.body.tags.farm,
      pro: request.body.tags.pro,
      noob: request.body.tags.noob,
      comp: request.body.tags.comp,
      casual: request.body.tags.casual
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({result}));
    }
  });
});

app.post('/games/:id/parties/:partyId/edit', function(request, response) {
  timedOutAPI.editParty({
    startTime: request.body.startTime,
    endTime: request.body.endTime,
    name: request.body.gameName,
    gameId: request.params.id,
    size: request.body.size,
    partyId: request.params.partyId,
    tags: {
      pvp: 1,
      pve: 0,
      exp: 1,
      farm: 1,
      pro: 1,
      noob: 0,
      comp: 1,
      casual: 0
    }
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({result}));
    }
  }
);
});

app.post('/games/:id/parties/:partyId/join', function(request, response) {
  console.log('body is', request.body);
  console.log('partyId: ', request.params.partyId);
  console.log('userId: ', request.body.userId);
  console.log('username: ', request.body.username);
  timedOutAPI.joinParty({
    partyId: request.params.partyId,
    userId: request.body.userId,
    username: request.body.username
  }, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    response.send(JSON.stringify({result}));
  }
});
});

app.post('/games/:id/parties/:partyId/leave', function(request, response) {
  console.log(request.body);
  timedOutAPI.leaveParty({
    partyId: request.params.partyId,
    userId: request.body.userId
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      response.send(JSON.stringify({result}));
    }
  });
});

app.post('/games/:id/parties/:partyId/delete', function(request, response) {
  console.log(request.body);
  timedOutAPI.deleteParty({
    partyId: request.params.partyId
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  });
});

app.post('/games/:id/parties/:partyId/confirm', function(request, response) {
  console.log(request.body);
  timedOutAPI.confirmParty({
    partyId: request.params.partyId
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  });
});

// app.post(/main/)

// query search with => /?search=
app.post('/games/:id/search/:size/:startTime', function(request, response) {
  var search = request.query.search;
  var gameId = request.params.id;
  var size = request.params.size;
  var startTime = request.params.startTime;
  timedOutAPI.searchParty({
    query: search,
    gameId: gameId,
    size: size,
    startTime: startTime
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  });
});


var server = app.listen(process.env.PORT, process.env.IP, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
