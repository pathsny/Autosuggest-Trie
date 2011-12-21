var PriorityQueue = exports.PriorityQueue = function(array, cmp) {
    this._cmp = cmp;
    this._arr = array.slice();
    this._makeHeap();
}

PriorityQueue.prototype = {
    length: function() {
        return this._arr.length;
    },
    
    peek: function() {
        return this._arr[0];
    },
    
    push: function(item) {
      this._arr.push(item);
      this._heapUp(this._arr.length - 1);
    },    

    pop: function() {
        var lastValue = this._arr.pop();
        if (this._arr.length == 0) return lastValue;
        var value = this._arr[0];
        this._arr[0] = lastValue;
        this._heapDown(0)
        return value;
    },
    
    _swap: function(i,j) {
        var temp = this._arr[i];
        this._arr[i] = this._arr[j];
        this._arr[j] = temp;
    },

    _heapDown: function(i) {
        var l = Math.floor(2*(i+1) - 1);
        var r = Math.floor(2*(i+1) + 1 - 1);
        var largest = l < this._arr.length && this._cmp(this._arr[l], this._arr[i]) > 0 ? l : i;
        if (r < this._arr.length && this._cmp(this._arr[r], this._arr[largest]) > 0) largest = r; 
        if (largest !== i) {
          this._swap(largest, i);
          this._heapDown(largest);
         } 
    },
    
    _heapUp: function(i) {
          var parent = Math.floor((i+1) / 2 - 1);
          if (parent > -1 && this._cmp(this._arr[i], this._arr[parent]) > 0) {
            this._swap(parent, i);
            this._heapUp(parent);
         }
    },
    
    _makeHeap: function() {
        for (var i = Math.floor(this._arr.length/2 - 1); i >= 0; i--) this._heapDown(i);
    }
}

