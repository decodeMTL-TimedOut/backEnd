/main - list of games
<<<<<<< HEAD
  [{
=======
  {
>>>>>>> origin/master
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
<<<<<<< HEAD
    }]
=======
    }
>>>>>>> origin/master

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
<<<<<<< HEAD
      registrations:
        {
          id: 123,
          userId: 123,
          joined: date(),
          left: date()
          username: pickleBoy123,
          email: pickleBoy@gmail.com
        }
=======
      game: {
        id: 123,
        name: `World of Warcraft`,
        art: `http://some.img.com/121234123.jpg`,
        aliases: [`wow`, `legion`],
        platform: `pc`,
        description: `the world's biggest time sink`,
        popularity: 100,
      },
        registrations: [
          {
            id: 123,
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
>>>>>>> origin/master
  }

   /games/:id/parties/:partyId/edit [post] - edit existing party
    {
      id: 123,
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
<<<<<<< HEAD
      status: `open|confirmed`
=======
      status: `open|confirmed`,
        game: {
          id: 123,
          name: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
          registrations: [
            {
              id: 123,
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
>>>>>>> origin/master
    }

   /games/:id/parties/:partyId/join [post] - join a party
    {
      id: 123,
<<<<<<< HEAD
          registrations:
=======
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`,
        game: {
          id: 123,
          name: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
          registrations: [
>>>>>>> origin/master
            {
              id: 123,
              userId: 123,
              joined: date(),
              left: date()
              username: pickleBoy123,
              email: pickleBoy@gmail.com
<<<<<<< HEAD
            }
=======
            },
            {
              member2
            },
            {
              member3
            }
          ]
>>>>>>> origin/master
    }

   /games/:id/parties/:partyId/leave [post] - leave party or kick player
    {
      id: 123,
<<<<<<< HEAD
          registrations:
            {
              id: 123,
            }
=======
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`,
        game: {
          id: 123,
          name: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
          registrations: [
            {
              id: 123,
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
>>>>>>> origin/master
    }

   /games/:id/parties/:partyId/delete [post] - delete party
    {
<<<<<<< HEAD
      id: 123
=======
      id: 123,
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`,
        game: {
          id: 123,
          name: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
          registrations: [
            {
              id: 123,
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
>>>>>>> origin/master
    }

   /games/:id/parties/:partyId/confirm [post]
    {
      id: 123,
<<<<<<< HEAD
    }

/search?s=SEARCHGAME_QUERY
[{
=======
      name: `Ganking noobs in Westfall!`,
      startTime: date(),
      endTime: date(),
      status: `open|confirmed`,
        game: {
          id: 123,
          name: `World of Warcraft`,
          art: `http://some.img.com/121234123.jpg`,
          aliases: [`wow`, `legion`],
          platform: `pc`,
          description: `the world's biggest time sink`,
          popularity: 100,
        },
          registrations: [
            {
              id: 123,
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
{
>>>>>>> origin/master
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
<<<<<<< HEAD
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

=======
  }

/search?s=SEARCHPARTY_QUERY

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
>>>>>>> origin/master

 A list of search result from the system game DB and external api
