function sortByEco(ecoCode) {
  let codeNum = ecoCode.slice(1);
  let openingCodeList = findCodeList(ecoCode.charAt(0));

  let codeKey = Object.keys(openingCodeList)
    .sort((a, b) => b - a)
    .find(num => codeNum >= parseInt(num));
  return openingCodeList[codeKey];

  function findCodeList(codeLetter) {
    const openingMasterList = [
      {
        // A00-39
        0: `Irregular Chess Openings`,
        1: `Larsen's Opening`,
        2: `Bird's Opening`,
        4: `Réti Opening`,
        10: `English Opening`,

        // A40-44
        40: `Queen's Pawn Game`,
        42: `Modern Defense`,
        43: `Old Benoni Defense`,

        // A45-49
        45: `Queen's Pawn Game`,
        46: `Torre Attack`,
        47: `Queen's Indian Defense`,
        48: `East Indian Defence`,

        // A50-79
        50: `Queen's Pawn Game`,
        51: `Budapest Gamit`,
        53: `Old Indian Defense`,
        56: `Benoni Defense`,
        57: `Benko Gamit`,
        60: `Benoni Defense`,
        70: `Benoni, Classical`,

        // A80-99
        80: `Dutch Defense`,
        letter: 'A',
      },

      {

        // B00-19
        0: `King's Pawn Opening`,
        1: `Scandinavian Defence`,
        2: `Alekhine's Defense`,
        6: `Modern Defence`,
        7: `Pirc Defense`,
        10: `Caro-Kann Defence`,

        // B20-99
        20: `Sicilian Defence`,
        34: `Accelerated Dragon`,
        40: `Sicilian Defence`,
        60: `Sicilian, Richter-Rauzer`,
        70: `Sicilian Dragon`,
        80: `Sicilian Scheveningen`,
        90: `Sicilian Najdorf`,
        letter: 'B',
      },

      {
        // C00-19
        0: `French Defence`,

        // C20-59
        20: `King's Pawn Game`,
        21: `Center Game`,
        23: `Bishop's Opening`,
        25: `Vienna Game`,
        30: `King's Gambit`,
        40: `King's Knight Opening`,
        41: `Philidor Defence`,
        42: `Petrov's Defence`,
        44: `King's Pawn Game`,
        45: `Scotch Game`,
        46: `Three Knights Game`,
        47: `Four Knight's Game`,
        50: `Italian Game`,
        51: `Evan's Gambit`,
        53: `Giuoco Piano`,
        55: `Two Knights Defence`,

        // C60-99
        60: `Ruy Lopez`,
        letter: 'C',
      },

      {
        // D00-69
        0: `Queen's Pawn Game`,
        1: `Richter-Veresov Attack`,
        2: `London System`,
        3: `Torre Attack`,
        4: `Queen's Pawn Game`,
        6: `Queen's Gambit`,
        7: `Queen's Gambit Declined`,
        20: `Queen's Gambit Accepted`,
        30: `Queen's Gambit Declined`,

        // D70-99
        70: `Neo-Grünfeld Defence`,
        80: `Grünfeld Defence`,
        letter: 'D',
      },

      {
        // E00-59
        0: `Queen's Pawn Game`,
        1: `Catalan Opening`,
        11: `Bogo-Indian Defence`,
        12: `Queen's Indian Defence`,
        20: `Nimzo-Indian Defence`,

        // E60-99
        60: `King's Indian Defence`,
        letter: 'E',
      }
    ];
    return openingMasterList.find(codeList => codeList.letter === codeLetter);
  }
}

