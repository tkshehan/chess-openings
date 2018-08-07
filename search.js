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
  console.log(query);
  $.ajax(query);
}

function buildQuery() {

  // 

  let gameTypes = '';
  $('[name=gametype]').each(function() {
    console.log($(this));
    if ($(this)[0].checked) {
      gameTypes += $(this).val() + ', ';
    }
  });

  return new Query(
    $('#username').val(),
    $('#number-of-games').val(),
    $('input[name=color]:checked').val(),
    gameTypes,
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
  this.beforeSend = function() {
    displayWaitMessage;
    $('.js-submit').prop('disabled', true);
  }
  this.timeout = 100000;
}

function enableSubmit() {
  $('.js-submit').prop('disabled', false);
}

function displayInvalidUser(error) {
  enableSubmit();
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

function successMessage() {
  $('.js-message').html(`
    <p>Games for ${userData.playerName}</p>
  `);
}

function handleSuccess(data) {
  enableSubmit();
  successMessage();
  parseData(data);
  revealTable();

  Promise.all(userData.keysSorted.map(opening => openSearch(opening)))
    .then(function(urls) {
      urls = urls.map(data => data[3][0]);
      displayTable(userData.openings, userData.keysSorted, urls);
    });
}

function openSearch(opening) {
  let query = {
    origin: '*',
    action: 'opensearch',
    search: opening,
    limit: 1,
    namespace: 0,
  }

  return $.getJSON('https://en.wikipedia.org/w/api.php', query, function(data) {
    return data;
  });


}

function parseData(data) {
  console.log('success');
  let splitData = data.split('\n\n\n');
  userData.games = splitData.map(parsePgn);
  userData.games.forEach(sortOpening);
  userData.openings = countOpenings(userData.games);
  userData.keysSorted = sortKeysByWins(userData.openings);



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

  function sortKeysByWins(games) {
    let keys = Object.keys(games).sort((a, b) => games[b] - games[a])
      .filter(a => a !== '?' && a !== 'undefined' && a !== '');
    return keys;
  }
}

function revealTable() {
  $('.js-table').removeClass('hidden');
}

function displayTable(data, keyOrder, urls) {
  renderEmptyTable();
  if (keyOrder.length >= 1) {
    renderRows(data, keyOrder, urls);
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

  function renderRows(data, keyOrder, urls) {
    keyOrder.forEach(function(key, index) {
      let row = `
      <tr>
        <td class="left">
          <a href="${urls[index]}" target="_blank">
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
