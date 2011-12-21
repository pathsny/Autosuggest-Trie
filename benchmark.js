var _ = require('underscore');
var Trie = require('./trie.js').Trie;

var generateRandomLength = function() {
    var c = Math.random();
    if (c < 0.05) return 3;
    if (c < 0.2) return 4;
    if (c < 0.3) return 5;
    if (c < 0.5) return 6;
    if (c < 0.7) return 7;
    if (c < 0.8) return 8;
    if (c < 0.85) return 9;
    if (c < 0.9) return 10;
    return 11; 
}

var chars = _(0).chain().range(10).concat(
    _(1).chain().range(27).map(function(i){
        return String.fromCharCode(64 + i);
    }).value()).value();

var generateRandom = function() {
    var length = generateRandomLength();
    var str = '';
    _(length).times(function(){
        str += chars[Math.floor(Math.random()*chars.length)]
    })
    return str;
}


function benchMark(size) {
    var items = [];
    var t = new Trie();
    _(size).times(function(i){
        var str = generateRandom();
        var score = Math.floor(Math.random()*21);
        items.push({
            a: str,
            score: score
        });
        
        t.insert({
            key: str,
            obj: {a: str, score: score},
            score: score
        });
    });
    var start = new Date();
    find('T', items, 5);
    console.log(new Date() - start);
    start = new Date();
    t.get('T', 5);
    console.log(new Date() - start);
}

function find(prefix, items, count) {
    var result = [];
    _(items).each(function(item){
        if (item.a.search(prefix) === 0) result.push(item);
    });
    result.sort(function(a, b){
        return b.score - a.score;
    });
    return result.slice(0, count);
}

benchMark(5000)
benchMark(50000)
benchMark(100000)
benchMark(500000)
