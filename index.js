var mysql = require('mysql');
var request = require('request');
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'timedOut', database: 'timedOut'});
var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);
var express = require('express');
var app = express();

app.get('/main', function(request, response) {
  timedOutAPI.listGames(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(result));
    }
  })
})

app.get('/games/:id', function(request, response) {
  timedOutAPI.listParties(request.params.id, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(JSON.stringify(result));
    }
  })
})

app.post('/games/:id/parties/create', function(request, response) {
  timedOutAPI.createParty({
    startTime: response.body.starTime,
    endTime: response.body.endTime,
    name: response.body.name,
    gameId: request.params.id,
    size: response.body.size,
    userId: loggedinuser
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(result));
    }
  })
})

app.post('/games/:id/parties/:partyId/edit', function(request, response) {
  timedOutAPI.editParty({
    startTime: response.body.starTime,
    endTime: response.body.endTime,
    name: response.body.name,
    gameId: request.params.id,
    size: response.body.size,
    partyId: request.params.partyId
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(result));
    }
  }
})
})

app.post('/games/:id/parties/:partyId/join', function(request, response) {
  timedOutAPI.joinParty({
    partyId: request.params.partyId,
    userId: loggedinuser
  }, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(result));
  }
})
})

app.post('/games/:id/parties/:partyId/leave', function(request, response) {
  timedOutAPI.leaveParty({
    partyId: request.params.id,
    userId: loggedinuser||otheruser
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  })
})

app.post('/games/:id/parties/:partyId/delete', function(request, response) {
  timedOutAPI.deleteParty({
    partyId: request.params.partyId
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  })
})

app.post('/games/:id/parties/:partyId/confirm', function(request, response) {
  timedOutAPI.confirmParty({
    partyId: request.params.partyId
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(JSON.stringify(result));
    }
  })
})
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
  })
})

var server = app.listen(3000, 'http://localhost', function() {
var host = server.address().address;
var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
