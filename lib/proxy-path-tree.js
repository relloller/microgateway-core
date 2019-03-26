// proxy-path-tree.js;

'use strict';
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
//     if(brocoli[val]){
//         if(brocoli)
//     }
// }, {});

// let pSegs = 'red/green/blue'.split('/');

var nug;
function getInWhereYouFitIn(path, brocoli) {
  var pSegs = path.split('/').filter(p => p !== '');
  console.log('pSegs', pSegs);
  var pLen = pSegs.length;
  var p0;
  var p1;
  var p2;
  var p3;
  var p4;
  if (pLen >= 4) p3 = pSegs[3]; //wip - set to remaining segs and recurse call
  if (pLen >= 3) p2 = pSegs[2];
  if (pLen >= 2) p1 = pSegs[1];
  if (pLen >= 1) p0 = pSegs[0];

  if (brocoli[p0]) {
    if (pLen === 1) return typeof brocoli[p0]['***'] !== 'undefined' ? brocoli[p0]['***'] : false;
    if (brocoli[p0][p1]) {
      if (pLen === 2) return typeof brocoli[p0][p1]['***'] !== 'undefined' ? brocoli[p0][p1]['***'] : false;
      if (brocoli[p0][p1][p2]) {
        if (pLen === 3) return typeof brocoli[p0][p1][p2]['***'] !== 'undefined' ? brocoli[p0][p1][p2]['***'] : false;
      } else if (brocoli[p0][p1]['*']) {
        if (pLen === 3) return typeof brocoli[p0][p1]['*']['***'] !== 'undefined' ? brocoli[p0][p1]['*']['***'] : false;
      } else {
        return typeof brocoli[p0][p1]['***'] !== 'undefined' ? brocoli[p0][p1]['***'] : false;
      }
    } else if (brocoli[p0]['*']) {
      if (pLen === 2) return typeof brocoli[p0]['*']['***'] !== 'undefined' ? brocoli[p0]['*']['***'] : false;
      if (brocoli[p0]['*'][p2]) {
        if (pLen === 3) return typeof brocoli[p0]['*'][p2]['***'] !== 'undefined' ? brocoli[p0]['*'][p2]['***'] : false;
      } else if (brocoli[p0]['*']['*']) {
        if (pLen === 3)
          return typeof brocoli[p0]['*']['*']['***'] !== 'undefined' ? brocoli[p0]['*']['*']['***'] : false;
      } else {
        return typeof brocoli[p0]['*']['***'] !== 'undefined' ? brocoli[p0]['*']['***'] : false;
      }
    } else {
      return typeof brocoli[p0]['***'] !== 'undefined' ? brocoli[p0]['***'] : false;
    }
  }
  return false;
}

const brocoli = {
  red: {
    '*': {
      blue: {
        '***': 'http://localhost:8123/red/star/blue',
        bear: {
          '***': 'http://localhost:8123/red/star/blue/bear',
          end: true
        }
      }
    },
    green: {
      '*': {
        '***': 'http://localhost:8123/red/green/star'
      },
      blue: {
        '***': 'http://localhost:8123/red/green/blue',
        end: true
      }
    }
  }
};

let targ = getInWhereYouFitIn(pathsToMatch[1], brocoli);
console.log('targ', targ);
