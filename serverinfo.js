// Local machine
var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'timedOut', database: 'timedOut'});

var server = app.listen(3000, 'http://localhost', function() {
  var host = server.address().address;
  var port = server.address().port;
   console.log('Example app listening at http://%s:%s', host, port);
 });

 // c9
 var connection = mysql.createConnection({
  host: 'localhost',
  user: 'leblancbryan',
  password: '',
  database: 'timedOut',
  multipleStatements: true
});

var server = app.listen(process.env.PORT, process.env.IP, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
