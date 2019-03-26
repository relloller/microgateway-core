// nitrogen-phosphorous-potassium.js;
'use strict';
const treeBuilder = require('./proxy-path-build.js');
const proxies = [
  { base_path: '/red/green/blue/', url: 'http://localhost:8123/red/green/blue' },
  { base_path: '/red/green/*/roygbiv', url: 'http://localhost:8123/red/green/star/roygbiv' },
  { base_path: '/red/green/*/', url: 'http://localhost:8123/red/green/star' },
  { base_path: '/red/*/blue/bear', url: 'http://localhost:8123/red/star/blue/bear' },
  { base_path: '/red/*/blue/', url: 'http://localhost:8123/red/star/blue' },
  { base_path: '/red/*/', url: 'http://localhost:8123/red/star' },
  { base_path: '/red/', url: 'http://localhost:8123/red' },
  { base_path: '/nitrogen', secure: false, url: 'http://localhost:8123/nitrogen' },
  { base_path: '/phosphorus', secure: false, url: 'http://localhost:8123/phosphorus' },
  { base_path: '/potassium', secure: false, url: 'http://localhost:8123/potassium' },
  { base_path: '/aug', secure: false, url: 'http://localhost:8123/rna/methionine' },
  { base_path: '/atg', secure: false, url: 'http://localhost:8123/dna/methionine' },
  { base_path: '/atg/gattaca/tag', secure: false, url: 'http://localhost:8123/DNA/start/gattaca/stop' },
  { base_path: '/atg/*/tag', secure: false, url: 'http://localhost:8123/DNA/start/aa/stop' }
  // { base_path: '/atg/*/tag', secure: false, url: 'http://localhost:8123/DNA/start-stop?code=},
];

let brusselSprout = {};
const broccoli = treeBuilder(brusselSprout, proxies);
console.dir(broccoli, { depth: 20 });
module.exports = broccoli;
// proxies.reduce((acc, {base_path,url})=>{
// let [...bpSegs, bpLast] = base_path.split('/').filter(p=>p!=='');
// const brusselSprout = {};
// bpSegs.reduce((acc,val)=> {
//     acc={...acc, ...{val:{}, '***end':false}};
//     return acc[val];
// }, brusselSprout);

// bpSegs.reduce(bp=>{
// },)

// },brusselSprout);
/*
 * build the broccoli tree
 * for each proxy
 *   split up base path segments into array '/' filter blanks ''
 *       elements `***end`=false
 *       last element `***`= `url(target)` `***end`=true unless existing `***end`=false
 *
 */
