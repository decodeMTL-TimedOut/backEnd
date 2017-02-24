(`
  SELECT parties.id as partyId, parties.startTime, parties.endTime,
  parties.name as partyName, parties.gameId, parties.size, parties.confirm,
  count(registrations.partyId) as members,
  games.name as gameName, games.art, games.aliases,
  games.platform, games.description, games.popularity,
  registrations.id as regId, registrations.userId as userId,
  registrations.joined as joined,
  registrations.left as whenLeft,
  users.email as email,
  users.username as username
  FROM parties
  LEFT JOIN registrations
  ON parties.id = registrations.partyId
  LEFT JOIN games
  ON parties.gameId = games.id
  LEFT JOIN users
  ON users.id = registrations.userId
  WHERE parties.size = ? AND parties.gameId = ?
  AND parties.startTime > ? AND parties.name LIKE ?
  ORDER BY parties.startTime ASC, members DESC
  `, [size, gameId, startTime, `%${query}%`],
function(err, response) {
  if(err) {
    callback(err);
  }
  else {
    console.log(JSON.stringify(response));
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
          status: `open|confirmed`,
          game: game,
          registrations: []
        };
        parties.push(party);
      }
                    console.log('this is parties ' + parties[0]);
                    console.log('this is party ' + party[0]);

      var gameBook = parties.find(function(game) {
        return game.gameId === row.gameId;
      });

      if (!game) {
        game = {
          gameId: row.gameId,
          gameName: row.gameName,
          art: row.art,
          aliases: row.aliases,
          platform: row.platform,
          popularity: row.popularity,
          desription: row.description,
        };
        party.gameInfo.push(game);
      }

      party.registrations.push({
        regId: row.regId,
        userId: row.userId,
        joined: row.joined,
        left: row.whenLeft,
        username: row.username,
        email: row.email
        });

      return parties;
    }, []);

    callback(null, parties)
  }
}
)
SELECT parties.name as partyName, parties.id as partyId, parties.size, parties.startTime, parties.endTime, parties.confirm, parties.gameId as gameId, games.name as gameName, games.aliases, games.platform, games.description, games.popularity, registrations.id as regId, registrations.userId, registrations.joined, registrations.left as whenLeft, count(registrations.partyId) as members, users.username, users.email FROM parties LEFT JOIN games ON parties.gameId = games.id LEFT JOIN registrations ON parties.id = registrations.partyId LEFT JOIN users ON users.id = registrations.userId WHERE parties.size = 4 AND parties.startTime > '2017-02-24 00:00:00' AND parties.gameId = 42 AND parties.name LIKE '%boo%' ORDER BY parties.startTime ASC, members DESC;
