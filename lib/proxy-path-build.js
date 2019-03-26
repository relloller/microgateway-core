'use strict';

//path obj
//1st path seg: broc: {
//    seg1:{***end:false}
// 	}
//2nd path seg broc:seg1.assign(seg2:{***end:false})
const proxies = [
  { base_path: '/atg/*/tag', secure: false, url: 'http://localhost:8123/DNA/start/star/stop' },
  { base_path: '/atg/gattaca/tag', secure: false, url: 'http://localhost:8123/DNA/start/gattaca/stop' },
  { base_path: '/atg/g/a/t/t/a/c/a/tag', secure: false, url: 'http://localhost:8123/DNA/start/g/a/t/t/a/c/a/stop' }
];

let pSegs = '/atg/g/a/t/t/a/c/a/tag'.split('/').filter(p => p !== '');
// let pURL = 'http://localhost:8123/DNA/start/g/a/t/t/a/c/a/stop';
function segueWay(broc, count, segs) {
  if (count === segs.length - 1) {
    if (broc[segs[count]]) {
      broc[segs[count]]['***'] = pURL;
      if (typeof broc[segs[count]]['***end'] === 'undefined') broc[segs[count]]['***end'] = true;
    } else {
      broc[segs[count]] = {
        '***': pURL,
        '***end': true
      };
    }
    return;
  }

  if (broc[segs[count]]) {
    broc[segs[count]]['***end'] = false;
  } else {
    broc[segs[count]] = {
      '***end': false
    };
  }
  return segueWay(broc[segs[count]], count + 1, segs);
}

function treeBuilder(sprout, proxies) {
  proxies.forEach(prx => {
    let pSegs = prx.base_path.split('/').filter(p => p !== '');
    let pURL = prx.url;
    function segueWay(broc, count, segs) {
      if (count === segs.length - 1) {
        if (broc[segs[count]]) {
          broc[segs[count]]['***'] = pURL;
          if (typeof broc[segs[count]]['***end'] === 'undefined') broc[segs[count]]['***end'] = true;
        } else {
          broc[segs[count]] = {
            '***': pURL,
            '***end': true
          };
        }
        return;
      }

      if (broc[segs[count]]) {
        broc[segs[count]]['***end'] = false;
      } else {
        broc[segs[count]] = {
          '***end': false
        };
      }
      return segueWay(broc[segs[count]], count + 1, segs);
    }
    segueWay(sprout, 0, pSegs);
  });
  return sprout;
}

// console.log('bsprout', bsprout);
// console.dir(orig, { depth: 15 });

module.exports = treeBuilder;
