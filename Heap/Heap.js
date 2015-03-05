// Insert: O(logN)
// Pop: O(logN)
// Build from another array: O(N)

function Heap() {
  function Node(key, value) {
    this.key = key;
    this.value = value;

    this.toString = function () {
      return '(' + this.key + ', ' + this.value + ')';
    }
  }

  Heap.Node = Node;

  var array = [];
  var size = 0;

  function leftChild(i) {
    if(i < 0) return -1;
    var l = i * 2 + 1;
    return l >= size ? -1 : l;
  }

  function rightChild(i) {
    if(i < 0) return -1;
    var r = i * 2 + 2;
    return r >= size ? -1 : r;
  }

  function parent(i) {
    if(i >= size || i <= 0) return -1;
    return Math.floor((i - 1) / 2);
  }

  function swap(i, j) {
    if(i >= 0 && j >= 0 && i < size && j < size && i != j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function bubbleUp(i) {
    var p = parent(i);
    if(p >= 0 && array[p].key < array[i].key) {
      swap(p, i);
      bubbleUp(p);
    }
  }

  function bubbleDown(i) {
    if(i >= 0 && i < size) {
      var j = i;

      var l = leftChild(i);
      if(l >= 0 && array[l].key > array[j].key) {
        j = l;
      }

      var r = rightChild(i);
      if(r >= 0 && array[r].key > array[j].key) {
        j = r;
      }

      if(j != i) {
        swap(i, j);
        bubbleDown(j);
      }
    }
  }

  this.clear = function () {
    size = 0;
    array = [];
  }

  this.isEmpty = function () {
    return size === 0;
  }

  this.getSize = function () {
    return size;
  }

  this.insert = function (key, value) {
    array[size] = new Node(key, value);
    size++;
    bubbleUp(size - 1);
  }

  this.pop = function () {
    if(this.isEmpty()) return null;

    var max = array[0];

    swap(0, size - 1);
    size--;
    bubbleDown(0);

    return max;
  }

  this.peek = function () {
    if(this.isEmpty()) return null;

    return array[0];
  }

  this.build = function (seedArray) {
    array = seedArray;
    size = seedArray.length;

    for(var k = Math.floor((size - 1) / 2); k >= 0; k--) {
      bubbleDown(k);
    }
  }

  this.toString = function () {
    var strs = [];
    array.forEach(function (n) {
      strs.push(n.toString());
    });

    return strs.join(', ');
  }
}

module.exports = Heap;
