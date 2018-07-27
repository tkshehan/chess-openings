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
}

function buildQuery() {

  let gameTypes = '';
  $('[name=gametype]').filter(type => $(type).attr('checked')).each(function() {
    gameTypes += $(this).val() + ',';
  });

  return new Query(
    $('#username').val(),
    $('#number-of-games').val(),
    $('input[name=color]:checked').val(),
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
  this.timeout = 100000;
}

function displayInvalidUser(error) {
  console.log(error);
  $('.js-message').html(`
    <p class="error">no known user has games of this type</p>
  `);
}

function displayWaitMessage() {
  $('.js-message').html(`
  <p>Please wait 1 second for every 10 requested games</p>
  `);
}

function clearMessage() {
  $('.js-message').empty();
}

function successMessage() {
  $('.js-message').html(`
    <p>Games for ${userData.playerName}</p>
  `);
}

function handleSuccess(data) {
  successMessage();
  parseData(data);
  displayTable(userData.openings, userData.keysSorted);
}

function parseData(data) {
  console.log('success');
  let splitData = data.split('\n\n\n');
  userData.games = splitData.map(parsePgn);
  userData.games.forEach(sortOpening);
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

  function sortOpening(game) {
    try {
      game.Opening = sortByEco(game.ECO);
    } catch (e) {
      console.log(e);
    }
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
      .filter(a => a !== '?' && a !== 'undefined' && a !== '');
    return keys;
  }
}

function displayTable(data, keyOrder) {
  renderEmptyTable();
  if (keyOrder.length >= 1) {
    renderRows(data, keyOrder);
  } else {
    displayInvalidUser();
  }


  function renderEmptyTable() {
    $('.js-table').html(`
        <h2>Openings</h2>
      <table>
        <thead>
          <th scope="col" class="left">Opening</th>
          <th scope="col" class="right">Games</th>
        </thead>
      </table>
  `);
  }

  function renderRows(data, keyOrder) {
    keyOrder.forEach(function(key) {
      let row = `
      <tr>
        <td class="left">
          <a href="https://wikipedia.org/wiki/${key}" target="_blank">
            ${key}
          </a>
        </td>
        <td class="right">${data[key]}</td>
      </tr>
      `;

      $('table').append(row);
    });
  }
}