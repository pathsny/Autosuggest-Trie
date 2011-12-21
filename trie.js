var _ = require('underscore');
var PriorityQueue = require('./heap').PriorityQueue; 

var Trie = exports.Trie = function () {
    this._root = this._create_node();
};

Trie.prototype = {
    insert: function(params) {
        this._insert(this._root, params.key, params.obj, params.score);
    },
    
    _create_node: function() {
        return {
            _items: []
        };
    },
    
    _insert: function(node, key, obj, score) {
        if (!node.score || node.score < score) node.score = score; 
        if (key === '') {
            node._items.push({
                obj: obj,
                score: score
            });
            return
        }

        if (!node[key[0]]) node[key[0]] = this._create_node();
        this._insert(node[key[0]], key.slice(1), obj, score);
    },
    
    get: function(prefix, count) {
        return this._get(this._root, prefix, count);
    },
    
    _get: function(node, prefix, count) {
        if (prefix === '') return this._getBestRanked(node, count);
        return node[prefix[0]] ?  this._get(node[prefix[0]], prefix.slice(1), count) : [];
    },
    
    _priority: function(a,b) {
        return a.score - b.score;
    },
    
    _getBestRanked: function(node, count) {
        var q = new PriorityQueue([], this._priority);
        var result = [];
        q.push(node);
        var currentNode;
        while(result.length < count && (currentNode = q.pop())) {
            if (currentNode.obj) {
                result.push(currentNode.obj);
            } else this._pushChildren(q, currentNode);
        }
        return result;
    },
    
    _pushChildren: function(q, node) {
        _(node._items).each(function(c){
            q.push(c);
        });
        _(node).chain().keys().each(function(k){
            if (k.length === 1) {
                q.push(node[k]);
            }
        });
    }
}

