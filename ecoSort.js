function sortByEco(ecoCode) {
  let opening;
  let codeNum = new CodeNum(ecoCode.slice(1));

  switch (ecoCode.charAt(0)) {
    case 'A':
      opening = codeAOpenings(codeNum);
      break;
    case 'B':
      opening = codeBOpenings(codeNum);
      break;
    case 'C':
      opening = codeCOpenings(codeNum);
      break;
    case 'D':
      opening = codeDOpenings(codeNum);
      break;
    case 'E':
      opening = codeEOpenings(codeNum);
      break;
    default:
      console.log('Invalid Code ' + ecoCode);
  }
  return opening;


  function codeAOpenings(codeNum) {

    // A00-39
    if (codeNum.isBetween(0)) return `Irregular Chess Openings`;
    if (codeNum.isBetween(1)) return `Larsen's Opening`;
    if (codeNum.isBetween(2, 3)) return `Bird's Opening`;
    if (codeNum.isBetween(4, 9)) return `Réti Opening`;
    if (codeNum.isBetween(10, 39)) return `English Opening`;

    // A40-44
    if (codeNum.isBetween(40, 41)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(42)) return `Modern Defense`;
    if (codeNum.isBetween(43, 44)) return `Old Benoni Defense`;

    // A45-49
    if (codeNum.isBetween(45)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(46)) return `Torre Attack`
    if (codeNum.isBetween(47)) return `Queen's Indian Defense`;
    if (codeNum.isBetween(48, 49)) return `East Indian Defence`;

    // A50-79
    if (codeNum.isBetween(50)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(51, 52)) return `Budapest Gamit`;
    if (codeNum.isBetween(53, 55)) return `Old Indian Defense`;
    if (codeNum.isBetween(56)) return `Benoni Defense`;
    if (codeNum.isBetween(57, 59)) return `Benko Gamit`;
    if (codeNum.isBetween(60, 69)) return `Benoni Defense`;
    if (codeNum.isBetween(70, 79)) return `Benoni, Classical`;

    // A80-99
    if (codeNum.isBetween(80, 99)) return `Dutch Defense`;
  }

  function codeBOpenings(codeNum) {

    // B00-19
    if (codeNum.isBetween(0)) return `King's Pawn Opening`;
    if (codeNum.isBetween(1)) return `Scandinavian Defence`;
    if (codeNum.isBetween(2, 5)) return `Alekhine's Defense`;
    if (codeNum.isBetween(6)) return `Modern Defence`;
    if (codeNum.isBetween(7, 9)) return `Pirc Defense`;
    if (codeNum.isBetween(10, 10)) return `Caro-Kann Defence`;

    // B20-99
    if (codeNum.isBetween(20, 33)) return `Sicilian Defence`;
    if (codeNum.isBetween(34, 39)) return `Accelerated Dragon`;
    if (codeNum.isBetween(40, 59)) return `Sicilian Defence`;
    if (codeNum.isBetween(60, 69)) return `Sicilian, Richter-Rauzer`;
    if (codeNum.isBetween(70, 79)) return `Sicilian Dragon`;
    if (codeNum.isBetween(80, 89)) return `Sicilian Scheveningen`;
    if (codeNum.isBetween(90, 99)) return `Sicilian Najdorf`;
  }

  function codeCOpenings(codeNum) {

    // C00-19
    if (codeNum.isBetween(0, 19)) return `French Defence`;

    // C20-59
    if (codeNum.isBetween(20)) return `King's Pawn Game`;
    if (codeNum.isBetween(21, 22)) return `Center Game`;
    if (codeNum.isBetween(23, 24)) return `Bishop's Opening`;
    if (codeNum.isBetween(25, 29)) return `Vienna Game`;
    if (codeNum.isBetween(30, 39)) return `King's Gambit`;
    if (codeNum.isBetween(40)) return `King's Knight Opening`;
    if (codeNum.isBetween(41)) return `Philidor Defence`;
    if (codeNum.isBetween(42, 43)) return `Petrov's Defence`;
    if (codeNum.isBetween(44)) return `King's Pawn Game`;
    if (codeNum.isBetween(45)) return `Scotch Game`;
    if (codeNum.isBetween(46)) return `Three Knights Game`;
    if (codeNum.isBetween(47, 49)) return `Four Knight's Game`;
    if (codeNum.isBetween(50)) return `Italian Game`;
    if (codeNum.isBetween(51, 52)) return `Evan's Gambit`;
    if (codeNum.isBetween(53, 54)) return `Giuoco Piano`;
    if (codeNum.isBetween(55, 59)) return `Two Knights Defence`;

    // C60-99
    if (codeNum.isBetween(60, 99)) return `Ruy Lopez`;
    // Consider Expanding
  }

  function codeDOpenings(codeNum) {

    // D00-69
    if (codeNum.isBetween(0)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(1)) return `Richter-Veresov Attack`;
    if (codeNum.isBetween(2)) return `London System`;
    if (codeNum.isBetween(3)) return `Torre Attack`;
    if (codeNum.isBetween(4, 5)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(6)) return `Queen's Gambit`;
    if (codeNum.isBetween(7, 19)) return `Queen's Gambit Declined`;
    if (codeNum.isBetween(20, 29)) return `Queen's Gambit Accepted`;
    if (codeNum.isBetween(30, 69)) return `Queen's Gambit Declined`;

    // D70-99
    if (codeNum.isBetween(70, 79)) return `Neo-Grünfeld Defence`;
    if (codeNum.isBetween(80, 99)) return `Grünfeld Defence`;
  }

  function codeEOpenings(codeNum) {

    // E00-59
    if (codeNum.isBetween(0)) return `Queen's Pawn Game`;
    if (codeNum.isBetween(1, 10)) return `Catalan Opening`;
    if (codeNum.isBetween(11)) return `Bogo-Indian Defence`;
    if (codeNum.isBetween(12, 19)) return `Queen's Indian Defence`;
    if (codeNum.isBetween(20, 59)) return `Nimzo-Indian Defence`;

    // E60-99
    if (codeNum.isBetween(60, 99)) return `King's Indian Defence`;
  }

  function CodeNum(codeNum) {
    this.val = codeNum;
    this.isBetween = (min, max = min) => this.val >= min && this.val <= max;
  }
}

