var PriorityQueue = require('./heap.js').PriorityQueue;
var assert = require('assert');

var items = [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5, 12, 5, 9, 6];
max_order = [12, 10, 9, 9, 8, 7, 6, 6, 5, 5, 4, 3, 2, 2, 1];
min_order = [1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 12];
var max = function(a, b) {
    return a - b;
}

var min = function(a,b) {
    return b - a;
}

var popAll = function(q) {
    var order = [];
    var item;
    while (item = q.pop()) {order.push(item)};
    return order;
}

module.exports = {
    'test empty queue': function() {
        var q = new PriorityQueue([], max);
        assert.isUndefined(q.pop());
    },
    
    'test insert items': function() {
        var q = new PriorityQueue([], max);
        items.forEach(function(item){q.push(item)});
        assert.eql(max_order, popAll(q));
    },
    
    'test heap cares about cmp function': function() {
        var q = new PriorityQueue([], min);
        items.forEach(function(item){q.push(item)});
        assert.eql(min_order, popAll(q));
    },
    
    'test heap can heapify pre-existing array': function() {
        var q = new PriorityQueue(items, min);
        assert.eql(min_order, popAll(q));
    },
    
    'test heap re-priorities items on the fly': function() {
        var q = new PriorityQueue([12, 10, 9], max);
        q.pop();
        q.push(7); q.push(11); q.push(3);
        assert.eql(11, q.pop());
    }
}
