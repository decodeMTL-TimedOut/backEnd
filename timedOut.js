var request = require('request');

module.exports = function timedOutAPI(conn) {
  return {
    searchGames: function(query, callback) {
      conn.query(`SELECT * FROM games WHERE name LIKE ? OR description LIKE ?`, [
        `%${query}%`, `%${query}%`
      ], function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
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
          callback(err);
        } else {
          var data = JSON.parse(response.body);
          var dataObj = data.results.map(function(res) {
            return {
              name: res.name,
              GBid: res.id,
              art: {
                // icon_url: res.image
                //   ? res.image.icon_url
                //   : null,
                // medium_url: res.image
                //   ? res.image.medium_url
                //   : null,
                // screen_url: res.image
                //   ? res.image.screen_url
                //   : null,
                // small_url: res.image
                //   ? res.image.small_url
                //   : null,
                super_url: res.image
                  ? res.image.super_url
                  : null,
                // thumb_url: res.image
                //   ? res.image.thumb_url
                //   : null,
                // tiny_url: res.image
                //   ? res.image.tiny_url
                //   : null
              },
              aliases: res.aliases,
              platforms: res.platforms
                ? res.platforms.map(function(plats) {
                  return {name: plats.name, id: plats.id, abbreviation: plats.abbreviation};
                })
                : null,
              deck: res.deck
            };
          }).forEach(function(dataObj, i, array) {
            if (i < 6) {
              if(dataObj.art.super_url === null) {
                return;
              }
              else {
              this.name = dataObj.name;
              this.GBid = dataObj.GBid;
              this.art = `${dataObj.art.super_url}`;
              this.aliases = dataObj.aliases;
              this.platforms = dataObj.platforms.map(function(plats) {
                return plats.name;
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
                  callback(err);
                } else {
                  return;
                }
              });
            }} else {
              return;
            }
          });
          conn.query(`
          SELECT * FROM games WHERE name LIKE ? OR description LIKE ?`, [
            `%${query}%`, `%${query}%`
          ], function(err, results) {
            if (err) {
              callback(err);
            } else {
              callback(null, results);
            }
          });
        }
      });
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
        `, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, result.map(function(res) {
            return {
              gameId: res.gameId,
              gameName: res.gameName,
              art: res.art,
              aliases: res.aliases,
              platform: res.platform,
              description: res.description,
              popularity: res.popularity
            };
          }));
        }
      });
    },
    listParties: function(gameId, callback) {
      conn.query(`  SELECT parties.id as partyId, startTime,
        endTime, confirm, parties.name as partyName,
        games.name as gameName, games.art,
        games.aliases, games.platform,
        games.description, games.popularity,
        games.id as gameId, users.id as userId,
        users.username, parties.size,
        tags.pvp, tags.pve, tags.exp, tags.farm,
        tags.pro, tags.noob, tags.comp, tags.casual
        FROM games
        LEFT JOIN parties
        ON parties.gameId = games.id
        LEFT JOIN registrations
        ON parties.id = registrations.partyId
        LEFT JOIN users
        ON registrations.userId = users.id
        LEFT JOIN tags
        ON parties.id = tags.partyId
        WHERE gameId = ?
        `, [`${gameId}`], function(err, response) {
        if (err) {
          callback(err);
        } else {
          var games = response.reduce(function(games, row) {
            var game = games.find(function(game) {
              return game.gameId === row.gameId;
            });

            if (!game) {
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

            if (!partyBook) {
              partyBook = {
                partyId: row.partyId,
                partyName: row.partyName,
                size: row.size,
                startTime: row.startTime,
                endTime: row.endTime,
                status: row.confirm,
                users: [],
                tags: []
              };
              game.parties.push(partyBook);
            }

            partyBook.users.push({userId: row.userId, username: row.username});
            partyBook.tags.push({
              pvp: row.pvp,
              pve: row.pve,
              exp: row.exp,
              farm: row.farm,
              pro: row.pro,
              noob: row.noob,
              comp: row.comp,
              casual: row.casual
            });

            return games;
          }, []);

          callback(null, games[0]);
        }
      });
    },
    createParty: function(create, callback) {
      var startTime = create.startTime;
      var endTime = create.endTime;
      var name = create.name;
      var size = create.size;
      var gameId = create.gameId;
      var userId = create.userId;
      var pvp = create.tags.pvp;
      var pve = create.tags.pve;
      var exp = create.tags.exp;
      var farm = create.tags.farm;
      var pro = create.tags.pro;
      var noob = create.tags.noob;
      var comp = create.tags.comp;
      var casual = create.tags.casual;
      conn.query(`
        SELECT registrations.id
        FROM registrations
        WHERE userId = ?`, [userId], function(err, result) {
        if (err) {
          callback(err);
        } else {
          if (result.length > 0) {
            callback('You are already in a party!');
          } else {
            conn.query(`
              INSERT INTO parties(startTime, endTime, name, gameId, size)
              VALUES(?,?,?,?,?)`, [
              startTime, endTime, name, gameId, size
            ], function(err, result) {
              if (err) {
                callback(err);
              } else {
                conn.query(`
                    INSERT INTO registrations(partyId, joined, userId)
                    VALUES((LAST_INSERT_ID()), NOW(), ?)`, [userId], function(err, res) {
                  if (err) {
                    callback(err);
                  } else {
                    conn.query(`
                      INSERT INTO tags(partyId, gameId, pvp, pve, exp, farm, pro, noob, comp, casual)
                      VALUES((SELECT partyId FROM registrations WHERE userId=?),
                      ?,?,?,?,?,?,?,?,?)`, [
                      userId,
                      gameId,
                      pvp,
                      pve,
                      exp,
                      farm,
                      pro,
                      noob,
                      comp,
                      casual
                    ], function(err, resu) {
                      if (err) {
                        callback(err);
                      } else {
                        conn.query(`
                            SELECT parties.id as partyId,
                            registrations.id as regId,
                            registrations.joined,
                            registrations.left as whenLeft,
                            users.username, users.email,
                            tags.pvp, tags.pve, tags.exp, tags.farm,
                            tags.pro, tags.noob, tags.comp, tags.casual
                            FROM parties
                            LEFT JOIN registrations
                            ON parties.id = registrations.partyId
                            LEFT JOIN users
                            ON registrations.userId = users.id
                            LEFT JOIN tags
                            ON parties.id = tags.partyId
                            WHERE registrations.userId = ?
                            `, [userId], function(err, re) {
                          if (err) {
                            callback(err);
                          } else {
                            callback(null, {
                              partyId: re[0].partyId,
                              partyName: name,
                              size: size,
                              startTime: startTime,
                              endTime: endTime,
                              status: `open`,
                              tags: {
                                pvp: re[0].pvp,
                                pve: re[0].pve,
                                exp: re[0].exp,
                                farm: re[0].farm,
                                pro: re[0].pro,
                                noob: re[0].noob,
                                comp: re[0].comp,
                                casual: re[0].casual
                              },
                              registration: {
                                regId: re[0].regId,
                                userId: userId,
                                joined: re[0].joined,
                                left: re[0].whenLeft,
                                username: re[0].username,
                                email: re[0].email
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    },
    editParty: function(edit, callback) {
      var startTime = edit.startTime;
      var endTime = edit.endTime;
      var name = edit.name;
      var size = edit.size;
      var partyId = edit.partyId;
      var userId = edit.userId;
      var pvp = edit.tags.pvp;
      var pve = edit.tags.pve;
      var exp = edit.tags.exp;
      var farm = edit.tags.farm;
      var pro = edit.tags.pro;
      var noob = edit.tags.noob;
      var comp = edit.tags.comp;
      var casual = edit.tags.casual;
      conn.query(`
      UPDATE parties
      LEFT JOIN tags
      ON parties.id = tags.partyId
      SET parties.startTime=?, parties.endTime=?, parties.name=?, parties.size=?,
      tags.partyId=?, tags.pvp=?, tags.pve=?, tags.exp=?, tags.farm=?,
      tags.pro=?, tags.noob=?, tags.comp=?, tags.casual=?
      WHERE parties.id=?
      `, [
        startTime,
        endTime,
        name,
        size,
        partyId,
        pvp,
        pve,
        exp,
        farm,
        pro,
        noob,
        comp,
        casual,
        partyId
      ], function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, {
            partyId: partyId,
            partyName: name,
            size: size,
            startTime: startTime,
            endTime: endTime,
            tags: {
              pvp: pvp,
              pve: pve,
              exp: exp,
              farm: farm,
              pro: pro,
              noob: noob,
              comp: comp,
              casual: casual
            }
          });
        }
      });
    },
    joinParty: function(join, callback) {
      var userId = join.userId;
      var partyId = join.partyId;
      conn.query(`
      SELECT COUNT(*) as count, parties.size
      FROM registrations
      LEFT JOIN parties
      ON partyId = parties.id
      WHERE partyId=?`, [partyId], function(err, res) {
        if (err) {
          callback(err);
        } else {
          if (res[0].count >= res[0].size) {
            callback("Party is full!");
          } else {
            conn.query(`
            INSERT INTO registrations(partyId, userId, joined)
            VALUES(?,?,NOW())`, [
              partyId, userId
            ], function(err, result) {
              if (err) {
                callback('You are already in a party!');
              } else {
                conn.query(`
                  SELECT registrations.id as regId,
                  registrations.userId, registrations.joined,
                  registrations.left as whenLeft,
                  users.username, users.email
                  FROM registrations
                  LEFT JOIN users
                  ON registrations.userId = users.id
                  WHERE partyId=?
                  `, [partyId], function(err, result) {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, {
                      partyId: partyId,
                      registrations: result
                    });
                  }
                });
              }
            });
          }
        }
      });
    },
    leaveParty: function(leave, callback) {
      var userId = leave.userId;
      var partyId = leave.partyId;
      var party = {
        partyId: partyId,
        userId: userId
      };
      conn.query(`
          DELETE FROM registrations
          WHERE userId=? AND partyId=?;
        `, [
        userId, partyId
      ], function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, party);
        }
      });
    },
    deleteParty: function(del, callback) {
      var partyId = del.partyId;
      var party = {
        partyId: partyId
      };
      conn.query(`
        DELETE FROM registrations
        WHERE partyId = ?`, [partyId], function(err, result) {
        if (err) {
          callback(err);
        } else {
          conn.query(`
            DELETE FROM parties
            WHERE id = ?`, [partyId], function(err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, party);
            }
          });
        }
      });
    },
    confirmParty: function(confirm, callback) {
      var partyId = confirm.partyId;
      var party = {
        partyId: partyId
      };
      conn.query(`
        SELECT confirm
        FROM parties
        WHERE id = ?
        `, [partyId], function(err, res) {
        if (err) {
          callback(err);
        } else {
          if (res[0].confirm === 0) {
            conn.query(`
              UPDATE parties
              SET confirm = 1
              WHERE id = ?
              `, [partyId], function(err, result) {
              if (err) {
                callback(err);
              } else {
                callback(null, party);
              }
            });
          } else {
            conn.query(`
                    UPDATE parties
                    SET confirm = 0
                    WHERE id = ?`, [partyId], function(err, result) {
              if (err) {
                callback(err);
              } else {
                callback(null, party);
              }
            });
          }
        }
      });
    },
    searchParty: function(search, callback) {
      var query = search.query;
      var size = search.size;
      var startTime = search.startTime;
      var gameId = search.gameId;
      conn.query(`
        SELECT parties.name as partyName, parties.id as partyId,
        parties.size, parties.startTime, parties.endTime,
        parties.confirm, parties.gameId as gameId,
        games.name as gameName, games.aliases, games.platform,
        games.description, games.popularity, games.art,
        registrations.id as regId, registrations.userId,
        registrations.joined, registrations.left as whenLeft,
        users.username, users.email, tags.pvp, tags.pve, tags.exp, tags.farm,
        tags.pro, tags.noob, tags.comp, tags.casual
        FROM parties
        LEFT JOIN games
        ON parties.gameId = games.id
        LEFT JOIN registrations
        ON parties.id = registrations.partyId
        LEFT JOIN users
        ON users.id = registrations.userId
        LEFT JOIN tags
        ON parties.id = tags.partyId
        WHERE parties.size = ? AND parties.startTime > ?
        AND parties.gameId = ? AND parties.name LIKE ?
        ORDER BY parties.startTime ASC
        `, [
        size, startTime, gameId, `%${query}%`
      ], function(err, response) {
        if (err) {
          callback(err);
        } else {
          var parties = response.reduce(function(parties, row) {
            var party = parties.find(function(party) {
              return party.partyId === row.partyId;
            });

            if (!party) {
              party = {
                partyId: row.partyId,
                partyName: row.partyName,
                size: row.size,
                startTime: row.startTime,
                endTime: row.endTime,
                status: row.confirm,
                tags: {
                  pvp: row.pvp,
                  pve: row.pve,
                  exp: row.exp,
                  farm: row.farm,
                  pro: row.pro,
                  noob: row.noob,
                  comp: row.comp,
                  casual: row.casual
                },
                game: {
                  gameId: row.gameId,
                  gameName: row.gameName,
                  art: row.art,
                  aliases: row.aliases,
                  platform: row.platform,
                  description: row.description,
                  popularity: row.popularity
                },
                registrations: []
              };
              parties.push(party);
            }

            var registration = parties.find(function(registration) {
              return registration.regId === row.regId;
            });

            if (!registration) {
              registration = {
                regId: row.regId,
                userId: row.userId,
                joined: row.joined,
                left: row.whenLeft,
                username: row.username,
                email: row.email
              };
              party.registrations.push(registration);
            }
            return parties;
          }, []);
          callback(null, parties);
        }
      });
    }
  };
};
