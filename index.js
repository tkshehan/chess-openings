let games;
let losses;
let playerName = 'eskimoform';

function start() {

  $.ajax({
    url: 'https://lichess.org/api/games/user/eskimoform',
    key: 'OujTu0ms0m8V0USk',
    data: {
      max: 200,
      opening: true,
      perfType: 'blitz,rapid,classical,correspondence',
      moves: false,
      color: 'white',
    },
    contentType: 'application/x-ndjson',
    type: 'GET',
    success: function(data) {
      console.log('success');
      let splitData = data.split('\n\n\n');
      games = splitData.map(parsePgn);
      losses = openingLosses(games);
    },
  });
}

function parsePgn(pgn) {
  pgn = pgn.split('\n');
  let game = {};
  pgn.forEach((entry, index) => {
    // Entry in the form of '[Key "value"]' 
    game[pgn[index].slice(1, pgn[index].indexOf(' '))] =
      pgn[index].slice(pgn[index].indexOf('"'), pgn[index].indexOf('"]')).slice(1);
  });
  return game;
}

function openingLosses(games) {
  let losses = games.filter(function(game) {
    if (game.Black === playerName && game.Result === '1-0') return true;
    if (game.White === playerName && game.Result === '0-1') return true;
    return false;
  });

  losses = losses.map(function(game) {
    return {
      opening: game.Opening,
      eco: `ECO ${game.ECO}`,
      url: game.Site,
    };
  });

  return losses.sort(function(a, b) {
    if (a.eco < b.eco) return -1;
    return 1;
  });
}

// https://www.googleapis.com/youtube/v3/search?
// part=snippet
// key=AIzaSyB7FPnZtg6Wo-KPKcxgAcoeQ3HJAfp-r7w
// channelId=UCHz5JQAUSkjxrosDIWCtEdw