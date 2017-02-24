var request = require('request');

module.exports = function timedOutAPI(conn) {
  return {
    searchGames: function(query, callback) {
      conn.query(`SELECT * FROM games WHERE name LIKE ? OR description LIKE ?`, [`%${query}%`, `%${query}%`], function(err, result) {
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
                  return;
                }
              })
            } else {
              return;
            }
          })
          conn.query(`
          SELECT * FROM games WHERE name LIKE ? OR description LIKE ?`, [`%${query}%`, `%${query}%`], function(err, results) {
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
        SELECT games.name as gameName, games.art,
        games.aliases, games.platform,
        games.description, games.popularity,
        games.id as gameId
        FROM games
        GROUP BY gameId
        ORDER BY popularity DESC
        `,
      function(err, result) {
        if(err) {
          callback(err)
        }
        else {
          callback(null, result.map(function(res) {
            return {
              gameId: res.gameId,
              gameName: res.gameName,
              art: res.art,
              aliases: res.aliases,
              platform: res.platform,
              description: res.description,
              popularity: res.popularity,
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
        games.id as gameId, count(parties.id) as partyCount,
        users.id as userId, users.username,
        parties.size
        FROM games
        LEFT JOIN parties
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
                partyCount: row.partyCount,
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
                size: row.size,
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
  },
  createParty: function(options, callback) {
    var startTime = options.startTime;
    var endTime = options.endTime;
    var name = options.name;
    var size = options.size;
    var gameId = options.gameId;
    var userId = options.userId;
    console.log(userId);
    conn.query(`
        SELECT registrations.id
        FROM registrations
        WHERE userId = ?`, [userId],
        function(err, result) {
          if(err) {
            callback(err)
          }
          else {
            if(result.length > 0) {
              console.log('You are already in a party!')
            }
            else {
              conn.query(`
              INSERT INTO parties(startTime, endTime, name, gameId, size)
              VALUES(?,?,?,?,?)`, [startTime, endTime, name, gameId, size],
              function(err, result) {
                if(err) {
                  callback(err);
                }
                else {
                  conn.query(`
                    INSERT INTO registrations(partyId, joined, userId)
                    VALUES((LAST_INSERT_ID()), NOW(), ?)`, [userId],
                    function(err, res) {
                      if(err) {
                        callback(err);
                      }
                      else {
                        callback(null, res);
                      }
                    }
                  )
                }
              })
            }
          }
        }
      )
  },
  editParty: function(options, callback) {
    var startTime = options.startTime;
    var endTime = options.endTime;
    var name = options.name;
    var size = options.size;
    var partyId = options.partyId;
    var userId = options.userId;
    conn.query(`
      UPDATE parties
      SET startTime=?, endTime=?, name=?, size=?
      WHERE parties.id=?
      `, [startTime, endTime, name, size, partyId],
    function(err, result) {
      if(err) {
        callback(err)
      }
      else {
        callback(null, result)
      }
    })
  },
  joinParty: function(options, callback) {
    var userId = options.userId;
    var partyId = options.partyId;
    conn.query(`
      SELECT COUNT(*) as count, parties.size
      FROM registrations
      LEFT JOIN parties
      ON partyId = parties.id
      WHERE partyId=?`, [partyId],
    function(err, res) {
      if(err) {
        callback(err);
      }
      else {
        if(res[0].count >= res[0].size) {
          console.log("Party is full!")
        }
        else {
          conn.query(`
            INSERT INTO registrations(partyId, userId, joined)
            VALUES(?,?,NOW())`, [partyId, userId],
            function(err, result) {
              if(err) {
                console.log('You are already in a party!')
              }
              else {
                callback(null, result);
              }
            }
          )
        }
      }
    })
  },

  }
}
