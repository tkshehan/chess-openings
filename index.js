$(start);

const userData = {};

function start() {
  handleForm();
}

function handleForm() {
  $('form').submit(function(event) {
    event.preventDefault();
    userData.playerName = $('#username').val();
    searchLichess();
  });
}

function searchLichess() {
  let query = buildQuery();
  $.ajax(query);
  console.log('please wait');
}

function buildQuery() {
  let gameTypes = '';
  $('[name=gametype][checked]').each(function() {
    gameTypes += $(this).val() + ',';
  });

  return new Query(
    $('#username').val(),
    $('#number-of-games').val(),
    $('[name=color][checked]').val(),
    gameTypes
  );
}

function Query(username, games, color, type) {
  this.url = `https://lichess.org/api/games/user/${username}`;
  this.data = {
    max: games,
    perfType: type,
    color: color,
    moves: false,
    opening: true,
  }

  this.contentType = 'application/x-ndjson';
  this.type = 'GET';
  this.success = handleSuccess;
  this.error = displayInvalidUser;
  this.beforeSend = displayWaitMessage;
}

function displayInvalidUser() {
  $('.js-message').html(`
    <p class="error">Invalid Username</p>
  `);
}

function displayWaitMessage() {
  clearMessage();
  $('.js-message').html(`
  <p>Please wait...</p>
  `)
}

function clearMessage() {
  $('.js-message').empty();
}

function handleSuccess(data) {
  clearMessage();
  parseData(data);
  displayTable(userData.openings, userData.keysSorted);
}

function parseData(data) {
  console.log('success');
  let splitData = data.split('\n\n\n');
  userData.games = splitData.map(parsePgn);
  userData.losses = findLosses(userData.games);
  userData.openings = countOpenings(userData.games);
  userData.keysSorted = sortKeys(userData.openings);


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

  function findLosses(games) {
    return games.filter(function(game) {
      if (game.Black === userData.playerName && game.Result === '1-0') return true;
      if (game.White === userData.playerName && game.Result === '0-1') return true;
      return false;
    });
  }

  function countOpenings(games) {
    let openings = {};
    games.forEach(function(game) {
      if (openings.hasOwnProperty(game.Opening)) {
        openings[game.Opening]++;
      } else {
        openings[game.Opening] = 1;
      }
    });
    return openings;
  }

  function sortKeys(games) {
    let keys = Object.keys(games).sort((a, b) => games[b] - games[a])
      .filter(a => a !== '?' && a !== 'undefined');
    return keys;
  }
}

function displayTable(data, keyOrder) {
  renderEmptyTable();
  renderRows(data, keyOrder);

  function renderEmptyTable() {
    $('.js-table').html(`
        <h2>Openings</h2>
      <table>
        <thead>
          <th scope="col">Opening</th>
          <th scope="col">Games</th>
        </thead>
      </table>
  `);
  }

  function renderRows(data, keyOrder) {
    keyOrder.forEach(function(key) {
      let row = `
      <tr>
        <td>${key}</td>
        <td>${data[key]}</td>
      </tr>
      `;

      $('table').append(row);
    });
  }
}