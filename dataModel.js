/main - list of games
  [{
    id: 12345,
    name: `World of Warcraft`,
    art: `http://some.img.com/121234123.jpg`,
    aliases: [`wow`, `legion`],
    platform: `pc`,
    description: `the world's biggest time sink`,
    popularity: 100,
       parties : [
         {
           id: 54321,
           name: `ganking noobs in Westfall!`,
           startTime: date(),
           endTime: date(),
           status: `open|confirmed`,
             players: [
               {
                 id: 43513,
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

/games/:id - list of parties
  {
    id: 12345,
    name: `World of Warcraft`,
    art: `http://some.img.com/121234123.jpg`,
    aliases: [`wow`, `legion`],
    platform: `pc`,
    description: `the world's biggest time sink`,
    popularity: 100,
       parties : [
         {
           id: 54321,
           name: `ganking noobs in Westfall!`,
           startTime: date(),
           endTime: date(),
           status: `open|confirmed`,
             players: [
               {
                 id: 43513,
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
    id: 123,
    name: `Ganking noobs in Westfall!`,
    startTime: date(),
    endTime: date(),
    status: `open`,
      registrations:
        {
          id: 123,
          userId: 123,
          joined: date(),
          left: date()
          username: pickleBoy123,
          email: pickleBoy@gmail.com
        }
  }

   /games/:id/parties/:partyId/edit [post] - edit existing party
    {
      id: 123,
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`
    }

   /games/:id/parties/:partyId/join [post] - join a party
    {
      id: 123,
          registrations:
            {
              id: 123,
              userId: 123,
              joined: date(),
              left: date()
              username: pickleBoy123,
              email: pickleBoy@gmail.com
            }
    }

   /games/:id/parties/:partyId/leave [post] - leave party or kick player
    {
      id: 123,
          registrations:
            {
              id: 123,
            }
    }

   /games/:id/parties/:partyId/delete [post] - delete party
    {
      id: 123
    }

   /games/:id/parties/:partyId/confirm [post]
    {
      id: 123,
    }

/search?s=SEARCHGAME_QUERY
[{
  id: 12345,
  name: `World of Warcraft`,
  art: `http://some.img.com/121234123.jpg`,
  aliases: [`wow`, `legion`],
  platform: `pc`,
  description: `the world's biggest time sink`,
  popularity: 100,
     parties : [
       {
         id: 54321,
         name: `ganking noobs in Westfall!`,
         startTime: date(),
         endTime: date(),
         status: `open|confirmed`,
           players: [
             {
               id: 43513,
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


/search?s=SEARCHPARTY_QUERY
{[
  id: 12345,
  name: `World of Warcraft`,
  art: `http://some.img.com/121234123.jpg`,
  aliases: [`wow`, `legion`],
  platform: `pc`,
  description: `the world's biggest time sink`,
  popularity: 100,
     parties : [
       {
         id: 54321,
         name: `ganking noobs in Westfall!`,
         startTime: date(),
         endTime: date(),
         status: `open|confirmed`,
           players: [
             {
               id: 43513,
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


 A list of search result from the system game DB and external api
