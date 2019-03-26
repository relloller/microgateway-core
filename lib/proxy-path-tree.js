// proxy-path-tree.js;

'use strict';
const broc = require('./nitrogen-phosphorous-potassium.js');
// req.path  /red/green/blue/         http://localhost:8123/red/green/blue
// basePath  /red/green/*/roygbiv     http://localhost:8123/red/green/star/roygbiv
// basePath  /red/green/*/            http://localhost:8123/red/green/star
// basePath  /red/*/blue/bear/        http://localhost:8123/red/star/blue/bear
// basePath  /red/*/blue/             http://localhost:8123/red/star/blue
// basePath  /red/*/                  http://localhost:8123/red/star
// basePath  /red/                    http://localhost:8123/red
let pathsToMatch = [
  'red/green/blue', // expect http://localhost:8123/red/green/blue
  'red/asdf/blue', //http://localhost:8123/red/star/blue
  'red/green/asdf', //http://localhost:8123/red/green/star
  'red/asdf/blue/bear', // http://localhost:8123/red/star/blue/bear
  'red/green/asdf/roygbiv/asdf' //http://localhost:8123/red/green/star/roygbiv
];

// 'red/green/blue'.split('/').reduce((acc, val) => {
//     if(broccoli[val]){
//         if(broccoli)
//     }
// }, {});

// let pSegs = 'red/green/blue'.split('/');

var nug;
function getInWhereYouFitIn(path, broccoli, recurse = false) {
  var pSegs;
  if (recurse === false) pSegs = path.split('/').filter(p => p !== '');
  else if (recurse === true && Array.isArray(path)) pSegs = path;
  console.log('pSegs', pSegs);
  var pLen = pSegs.length;
  var p0;
  var p1;
  var p2;
  var pRest;
  if (pLen > 3) [p0, p1, p2, ...pRest] = pSegs;
  //wip - set to remaining segs and recurse call
  else if (pLen === 3) [p0, p1, p2] = pSegs;
  else if (pLen === 2) [p0, p1] = pSegs;
  else if (pLen === 1) [p0] = pSegs;

  if (broccoli[p0]) {
    if (pLen === 1 || broccoli[p0]['end'] === true)
      return typeof broccoli[p0]['***'] !== 'undefined' ? broccoli[p0]['***'] : false;
    if (broccoli[p0][p1]) {
      if (pLen === 2 || broccoli[p0][p1]['end'] === true)
        return typeof broccoli[p0][p1]['***'] !== 'undefined' ? broccoli[p0][p1]['***'] : false;
      if (broccoli[p0][p1][p2]) {
        if (pLen === 3 || broccoli[p0][p1][p2]['end'] === true)
          return typeof broccoli[p0][p1][p2]['***'] !== 'undefined' ? broccoli[p0][p1][p2]['***'] : false;
        return getInWhereYouFitIn(pRest, broccoli[p0][p1][p2], true);
      } else if (broccoli[p0][p1]['*']) {
        if (pLen === 3 || broccoli[p0][p1]['*']['end'] === true)
          return typeof broccoli[p0][p1]['*']['***'] !== 'undefined' ? broccoli[p0][p1]['*']['***'] : false;
        return getInWhereYouFitIn(pRest, broccoli[p0][p1]['*'], true);
      } else {
        return typeof broccoli[p0][p1]['***'] !== 'undefined' ? broccoli[p0][p1]['***'] : false;
      }
    } else if (broccoli[p0]['*']) {
      if (pLen === 2 || broccoli[p0]['*']['end'] === true)
        return typeof broccoli[p0]['*']['***'] !== 'undefined' ? broccoli[p0]['*']['***'] : false;
      if (broccoli[p0]['*'][p2]) {
        if (pLen === 3 || broccoli[p0]['*'][p2]['end'] === true)
          return typeof broccoli[p0]['*'][p2]['***'] !== 'undefined' ? broccoli[p0]['*'][p2]['***'] : false;
        return getInWhereYouFitIn(pRest, broccoli[p0]['*'][p2], true);
      } else if (broccoli[p0]['*']['*']) {
        if (pLen === 3 || broccoli[p0]['*']['*']['end'] === true)
          return typeof broccoli[p0]['*']['*']['***'] !== 'undefined' ? broccoli[p0]['*']['*']['***'] : false;
        return getInWhereYouFitIn(pRest, broccoli[p0]['*']['*'], true);
      } else {
        return typeof broccoli[p0]['*']['***'] !== 'undefined' ? broccoli[p0]['*']['***'] : false;
      }
    } else {
      return typeof broccoli[p0]['***'] !== 'undefined' ? broccoli[p0]['***'] : false;
    }
  } else if (recurse === true && typeof broccoli['***'] !== 'undefined') {
    return broccoli['***'];
  }
  return false;
}

const broccoliTree = {
  red: {
    '*': {
      blue: {
        '***': 'http://localhost:8123/red/star/blue',
        bear: {
          '***': 'http://localhost:8123/red/star/blue/bear',
          '***end': true
        },
        '***end': false
      },
      '***end': false
    },
    green: {
      '*': {
        '***': 'http://localhost:8123/red/green/star',
        roygbiv: {
          '***': 'http://localhost:8123/red/green/star/roygbiv',
          '***end': true
        },
        '***end': false
      },
      blue: {
        '***': 'http://localhost:8123/red/green/blue',
        '***end': true
      },
      '***end': false
    },
    '***end': false
  },
  '***end': false
};

let targ = getInWhereYouFitIn(pathsToMatch[3], broccoliTree);
console.log('targ', targ);
let targCom = getInWhereYouFitIn(pathsToMatch[3], broc);
console.log('targCom', targCom);
