// proxy-path-tree.js;

'use strict';
const _ = require('lodash');
const assert = require('assert');
// const broc = require('./nitrogen-phosphorous-potassium.js');

//target basepath
// const ps = [{
//         basePath: '/red/green/blue',
//         url: 'http://localhost:8123/red/green/blue'
//     },
//     { basePath: '/red/green/*/roygbiv', url: 'http://localhost:8123/red/green/star/roygbiv' },
//     { basePath: '/red/green/*/roygbiv/asdf', url: 'http://localhost:8123/red/green/star/roygbiv/asdf' },
//         { basePath: '/red/green/*/roygbiv/*/wer', url: 'http://localhost:8123/red/green/star/roygbiv/star/wer' },
//     { basePath: '/red/green/*', url: 'http://localhost:8123/red/green/star' },
//     { basePath: '/red/*/blue/bear', url: 'http://localhost:8123/red/star/blue/bear' },
//     { basePath: '/red/*/blue', url: 'http://localhost:8123/red/star/blue' },
//     { basePath: '/red/*', url: 'http://localhost:8123/red/star' },
//     { basePath: '/red', url: 'http://localhost:8123/red' }
// ];

function buildTrie(ps) {
    let obj = {};

    ps.forEach((px) => {
        let glob = {};
        let lastPath;
        px.base_path.split('/').filter(p => p !== '' && p !== '/')
            .reduce((o, v, ind, src) => {
                if (src.length === ind + 1) {
                    o[v] = { '***': px.url};
                    lastPath=o;
                }
                else o[v] = {};
                return o[v];
            }, glob);
        console.dir(glob, { depth: 10 });
        obj=_.merge(obj,glob);
        console.log('lastPath', lastPath);
        
        console.dir(lastPath,{depth:10});
    })

    console.dir(obj,{depth:10});
    return obj;
}

// var basePath='/red/green/blue';

// {}
// 'red/green/blue'.split('/').reduce((acc, val) => {
//     if(broccoli[val]){
//         if(broccoli)
//     }
// }, {});

// let pSegs = 'red/green/blue'.split('/');

// var nug;

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
    if (pLen > 3)[p0, p1, p2, ...pRest] = pSegs;
    //wip - set to remaining segs and recurse call
    else if (pLen === 3)[p0, p1, p2] = pSegs;
    else if (pLen === 2)[p0, p1] = pSegs;
    else if (pLen === 1)[p0] = pSegs;

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
    return broccoli['***'] || false;
}

const broccoliTree = {
    red: {
        '*': {
            blue: {
                '***': 'http://localhost:8123/red/star/blue',
                bear: {
                    '***': 'http://localhost:8123/red/star/blue/bear',
                    'end': true
                },
            },
        },
        green: {
            '*': {
                '***': 'http://localhost:8123/red/green/star',
                roygbiv: {
                    '***': 'http://localhost:8123/red/green/star/roygbiv',
                    'asdf': {
                        '***': 'http://localhost:8123/red/green/star/roygbiv/asdf',
                        wer:{
                          avds:{
                            '***':'http://localhost:8123/red/green/star/roygbiv/asdf/wer/avds',
                            end: true
                          }
                        }
                    }
                },
            },
            blue: {
                '***': 'http://localhost:8123/red/green/blue',
                'end': true
            },
        },
    },
};
let pathsToMatch = [
    {base_path: 'red/green/blue',  url:'http://localhost:8123/red/green/blue'},
     {base_path:'red/asdf/blue', url:'http://localhost:8123/red/star/blue'},
     {base_path:'red/green/asdf', url:'http://localhost:8123/red/green/star'},
     {base_path:'red/asdf/blue/bear', url:'http://localhost:8123/red/star/blue/bear'},
     {base_path:'red/green/asdf/roygbiv/qwerty/wer/avds', url:'http://localhost:8123/red/green/star/roygbiv/star/wer'},
     {base_path:'red/green/asdf/roygbiv/asdf', url:'http://localhost:8123/red/green/star/roygbiv/asdf'},
     {base_path:'red/asdf/blue/asdfwer/asdf', url:'http://localhost:8123/red/star/blue'},
     {base_path:'red/asdf/blue/asdfwer/asdf/qwer', url:'http://localhost:8123/red/star/blue'}

];
// let targ = 
//pathsToMatch.forEach(({base_path, url})=>{
  //var targ = getInWhereYouFitIn(base_path, obj);
  //console.log(base_path +':'+targ);
 // assert.equal(targ, url);
//});
// let targCom = getInWhereYouFitIn(pathsToMatch[3], broc);
// console.log('targCom', targCom);

module.exports={
    matchPath: getInWhereYouFitIn,
    buildTrie   
}
