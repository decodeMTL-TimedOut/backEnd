var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'timedOut',
  database : 'timedOut'
});

var timedOut = require('./timedOut');
var timedOutAPI = timedOut(connection);

timedOutAPI.test({
  id: '557',
  username: 'megamon',
  password: '20xx',
  email: 'mega@mon.com'
}, function(err, user) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(user);
    connection.end();
  }
}

)

// connection.connect();
//
// connection.query(
//   `INSERT INTO users
//   (id, username, email, password, createdAt, updatedAt)
//   VALUES (?,?,?,?, NOW(), NOW())`,
//   ['123', 'brain', 'brain@brain.com', 'brain']
// );
// connection.end();
