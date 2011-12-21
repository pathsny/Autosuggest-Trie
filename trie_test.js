var Trie = require('./trie.js').Trie;
var assert = require('assert');
var _ = require('underscore');

var make_item = function(key, score) {
    return {key: key, obj: {a: key}, score: score};
}

var testTrie = function() {
    var t = new Trie();
    t.insert(make_item('table',10));
    t.insert(make_item('tabula', 2));
    t.insert(make_item('tabut', 8));
    t.insert(make_item('teaspoon', 8));
    t.insert(make_item('teak', 4));
    t.insert(make_item('trojan', 12));
    t.insert(make_item('troy', 7));
    t.insert(make_item('troglodyte', 1));
    return t;
}

var words = function(matches) {
    return _(matches).chain().pluck('a').sort().value();
}

module.exports = {
    'items can be inserted': function() {
        var t = new Trie();
        t.insert({key: 'hello', obj: {a: 'hello'}, score: 20});
    },
    
    'get returns no matches if there is no matching item': function() {
        assert.eql([], words(testTrie().get('trou', 3)));
    },
    
    'get returns the best set of matching items': function() {
        assert.eql(['table', 'tabut', 'trojan'], words(testTrie().get('t', 3)));
    },
    
    'get returns less scoring matches when the match string improves': function() {
        assert.eql(['table', 'tabula', 'tabut'], words(testTrie().get('ta', 3)));
    },
    
    'get returns a configurable number of items': function() {
        assert.eql(['trojan', 'troy'], words(testTrie().get('tr', 2)));
    },
    
    'get returns the as many matching items as possible under the required count': function() {
        assert.eql(['troglodyte'], words(testTrie().get('trog', 3)));
    },
    
    'update changes the score of an existing item'
    
    
}
