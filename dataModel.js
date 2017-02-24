/main - list of games
[{
    gameId: 12345,
    gameName: `World of Warcraft`,
    art: `http://some.img.com/121234123.jpg`,
    aliases: [`wow`, `legion`],
    platform: `pc`,
    description: `the world's biggest time sink`,
    popularity: 100,
    },
    {
      game2
    },
    {
      game3
    }]

/games/:id - list of parties
  {
    gameId: 12345,
    gameName: `World of Warcraft`,
    art: `http://some.img.com/121234123.jpg`,
    aliases: [`wow`, `legion`],
    platform: `pc`,
    description: `the world's biggest time sink`,
    popularity: 100,
    partyCount: 5,
       parties : [
         {
           partyId: 54321,
           partyName: `ganking noobs in Westfall!`,
           size: 5,
           startTime: date(),
           endTime: date(),
           status: `open|confirmed`,
             players: [
               {
                 userId: 43513,
                 username: pickleBoy123
               },
               {
                 player2
               },
               {
                 player3
               }
           ]
         },
         {
           party2
         },
         {
           party3
         }
       ]
  }

 /games/:id/parties/create [post] - create a new party
  {
    partyId: 123,
    partyName: `Ganking noobs in Westfall!`,
    size: 5,
    startTime: date(),
    endTime: date(),
    status: `open`,
      registration:
        {
          regId: 123,
          userId: 123,
          joined: date(),
          left: date()
          username: pickleBoy123,
          email: pickleBoy@gmail.com
        }
  }

   /games/:id/parties/:partyId/edit [post] - edit existing party
    {
      partyId: 123,
      partyName: `Ganking noobs in Westfall!`,
      size: 5,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`
    }

   /games/:id/parties/:partyId/join [post] - join a party
    {
      partyId: 123,
          registrations:
            [{
              regId: 123,
              userId: 123,
              joined: date(),
              left: date()
              username: pickleBoy123,
              email: pickleBoy@gmail.com
            },
            {
              member2
            },
            {
              member3
            }]
    }

   /games/:id/parties/:partyId/leave [post] - leave party or kick player
    {
      partyId: 123,
          registrations:
            {
              regId: 123
            }
}

   /games/:id/parties/:partyId/delete [post] - delete party
    {
      partyId: 123
    }

   /games/:id/parties/:partyId/confirm [post]
    {
      partyId: 123
    }

/search?s=SEARCHPARTY_QUERY
[{
      partyName: `Ganking noobs in Westfall!`,
      size: 5,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`,
        game: {
          gameId: 123,
          gameName: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
        registrations: [
          {
            regId: 123,
            userId: 123,
            joined: date(),
            left: date()
            username: pickleBoy123,
            email: pickleBoy@gmail.com
          },
          {
            member2
          },
          {
            member3
          }
        ]
    }

/search?s=SEARCHGAME_QUERY
[{
  gameId: 12345,
  gameName: `World of Warcraft`,
  art: `http://some.img.com/121234123.jpg`,
  aliases: [`wow`, `legion`],
  platform: `pc`,
  description: `the world's biggest time sink`,
  popularity: 100,
     parties : [
       {
         partyId: 54321,
         partyName: `ganking noobs in Westfall!`,
         size: 5,
         startTime: date(),
         endTime: date(),
         status: `open|confirmed`,
           players: [
             {
               userId: 43513,
               username: pickleBoy123
             },
             {
               player2
             },
             {
               player3
             }
         ]
       },
       {
         party2
       },
       {
         party3
       }
     ]
  },
  {
    game2
  },
  {
    game3
  }]
