var request = require('request');

module.exports = function timedOutAPI(conn) {
  return {
    test: function(data, callback) {
      conn.query(`INSERT INTO users
          (id, username, email, password, createdAt, updatedAt)
          VALUES (?,?,?,?, NOW(), NOW())`, [data.id, data.username, data.email, data.password])
      conn.end();
    },
    search: function(query, callback) {
      conn.query(`SELECT * FROM games WHERE name LIKE ?`, [`%${query}%`], function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      })
    },
    searchGB: function(query, callback) {
      var GBkey = '24c521131ec5e42ac4bf79f04cb0993a672588b6';
      var GBurl = 'http://www.giantbomb.com/api';
      var url = `${GBurl}/search?api_key=${GBkey}&format=json&query=${query}&resources=game`;
      var browser = `http://www.giantbomb.com/api/search?api_key=24c521131ec5e42ac4bf79f04cb0993a672588b6&format=json&query=world of Warcraft&resources=game`
      var options = {
        url: url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
        }
      };
      request(options, function(err, response) {
        if (err) {
          console.log(err);
        } else {
          data = JSON.parse(response.body);
          var dataObj = data.results.map(function(res) {
            return {
              name: res.name,
              GBid: res.id,
              art: {
                icon_url: res.image
                  ? res.image.icon_url
                  : null,
                medium_url: res.image
                  ? res.image.medium_url
                  : null,
                screen_url: res.image
                  ? res.image.screen_url
                  : null,
                small_url: res.image
                  ? res.image.small_url
                  : null,
                super_url: res.image
                  ? res.image.super_url
                  : null,
                thumb_url: res.image
                  ? res.image.thumb_url
                  : null,
                tiny_url: res.image
                  ? res.image.tiny_url
                  : null
              },
              aliases: res.aliases,
              platforms: res.platforms
                ? res.platforms.map(function(plats) {
                  return {name: plats.name, id: plats.id, abbreviation: plats.abbreviation}
                })
                : null,
              deck: res.deck
            }
          }).forEach(function(dataObj, i, array) {
            if (i < 6) {
              this.name = dataObj.name;
              this.GBid = dataObj.GBid;
              this.art = `${dataObj.art.icon_url} ${dataObj.art.medium_url} ${dataObj.art.screen_url} ${dataObj.art.small_url} ${dataObj.art.super_url} ${dataObj.art.thumb_url} ${dataObj.art.tiny_url}`;
              this.aliases = dataObj.aliases;
              this.platforms = dataObj.platforms.map(function(plats) {
                return plats.name
              }).join(',');
              this.description = dataObj.deck;
              conn.query(`
                INSERT INTO games(name,GB_id,art,aliases,platform,description)
                VALUES(?, ?, ?, ?, ?, ?);
                `, [
                this.name,
                this.GBid,
                this.art,
                this.aliases,
                this.platforms,
                this.description
              ], function(err, response) {
                if (err) {
                  callback(err)
                } else {
                  console.log(response);
                  return;
                }
              })
            } else {
              return;
            }
          })
          conn.query(`
          SELECT * FROM games WHERE name LIKE ?`, [`%${query}%`], function(err, results) {
            if (err) {
              callback(err)
            } else {
              callback(null, results)
            }
          })
        }
      })
    },
    listGames: function(callback) {
      conn.query(`
      SELECT games.id as gameId, games.name as gameName, games.art,
      games.aliases, games.platform, games.popularity,
      games.description
      FROM games
      GROUP BY gameId
      ORDER BY popularity
      LIMIT 4`, function(err, response) {
        if (err) {
          callback(err)
        } else {
          console.log(response);
          var test = response.map(function(t) {
            return {
              id: t.gameId
            }
          })
          callback(null, response.map(function(res) {
            return {
              id: res.gameId,
              name: res.gameName,
              art: res.art,
              aliases: res.aliases,
              platform: res.platform,
              description: res.description,
              popularity: res.popularity
            }
          }))
        }
      })
    },
    listParties: function(gameId, callback) {
      conn.query(`
        SELECT parties.id as partyId, startTime,
        endTime, success, parties.name as partyName,
        games.name as gameName, games.art,
        games.aliases, games.platform,
        games.description, games.popularity,
        games.id as gameId,
        users.id as userId, users.username
        FROM parties
        LEFT JOIN games
        ON parties.gameId = games.id
        LEFT JOIN registrations
        ON parties.id = registrations.partyId
        LEFT JOIN users
        ON registrations.userId = users.id
        WHERE gameId = ?
        `, [`${gameId}`],
      function(err, response) {
        if(err) {
          callback(err)
        }
        else {
          var games = response.reduce(function(games, row) {
            var game = games.find(function(game) {
              return game.gameId === row.gameId;
            });

            if(!game) {
              game = {
                gameId: row.gameId,
                gameName: row.gameName,
                art: row.art,
                aliases: row.aliases,
                platform: row.platform,
                description: row.description,
                popularity: row.popularity,
                  parties: []
              };
              games.push(game);
            }

            var partyBook = game.parties.find(function(party) {
              return party.partyId === row.partyId;
            });

            if(!partyBook) {
              partyBook = {
                partyId: row.partyId,
                partyName: row.partyName,
                startTime: row.startTime,
                endTime: row.endTime,
                status: row.success,
                  users: []
              };
              game.parties.push(partyBook);
            }

            partyBook.users.push({
              userId: row.userId,
              username: row.username
            });

            return games;
          }, []);

        callback(null, games)
      }
    })
  }
  }
}

//   createUser: function(user, callback) {
//
//     // first we have to hash the password...
//     bcrypt.hash(user.password, HASH_ROUNDS, function(err, hashedPassword) {
//       if (err) {
//         callback(err);
//       }
//       else {
//         conn.query(
//           'INSERT INTO users (username,password, createdAt) VALUES (?, ?, ?)', [user.username, hashedPassword, new Date()],
//           function(err, result) {
//             if (err) {
//               /*
//               There can be many reasons why a MySQL query could fail. While many of
//               them are unknown, there's a particular error about unique usernames
//               which we can be more explicit about!
//               */
//               if (err.code === 'ER_DUP_ENTRY') {
//                 callback(new Error('A user with this username already exists'));
//               }
//               else {
//                 callback(err);
//               }
//             }
//             else {
//               /*
//               Here we are INSERTing data, so the only useful thing we get back
//               is the ID of the newly inserted row. Let's use it to find the user
//               and return it
//               */
//               conn.query(
//                 'SELECT id, username, createdAt, updatedAt FROM users WHERE id = ?', [result.insertId],
//                 function(err, result) {
//                   if (err) {
//                     callback(err);
//                   }
//                   else {
//                     /*
//                     Finally! Here's what we did so far:
//                     1. Hash the user's password
//                     2. Insert the user in the DB
//                     3a. If the insert fails, report the error to the caller
//                     3b. If the insert succeeds, re-fetch the user from the DB
//                     4. If the re-fetch succeeds, return the object to the caller
//                     */
//                       callback(null, result[0]);
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     });
//   },
//   createPost: function(post, callback) {
//     conn.query(
//       'INSERT INTO posts (userId, title, url, createdAt) VALUES (?, ?, ?, ?)', [post.userId, post.title, post.url, new Date()],
//       function(err, result) {
//         if (err) {
//           callback(err);
//         }
//         else {
//           /*
//           Post inserted successfully. Let's use the result.insertId to retrieve
//           the post and send it to the caller!
//           */
//           conn.query(
//             'SELECT id,title,url,userId, createdAt, updatedAt FROM posts WHERE id = ?', [result.insertId],
//             function(err, result) {
//               if (err) {
//                 callback(err);
//               }
//               else {
//                 callback(null, result[0]);
//               }
//             }
//           );
//         }
//       }
//     );
//   },
//   getAllPosts: function(options, callback) {
//     // In case we are called without an options parameter, shift all the parameters manually
//     if (!callback) {
//       callback = options;
//       options = {};
//     }
//     var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
//     var offset = (options.page || 0) * limit;
//
//     conn.query(`
//       SELECT id, title, url, userId, createdAt, updatedAt
//       FROM posts
//       ORDER BY createdAt DESC
//       LIMIT ? OFFSET ?`
//       , [limit, offset],
//       function(err, results) {
//         if (err) {
//           callback(err);
//         }
//         else {
//           callback(null, results);
//         }
//       }
//     );
//   }
