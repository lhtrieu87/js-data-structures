// Insert:                            O(logN) || O(1)
// Pop:                               O(logN)
// Peek:                              O(1)
// Build from another array:          O(N)
// Heap.sort (in placed, not stable): O(NlogN)

function swap(array, size, i, j) {
  if(i >= 0 && j >= 0 && i < size && j < size && i != j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function leftChild(i, size) {
  if(i < 0) return -1;
  var l = i * 2 + 1;
  return l >= size ? -1 : l;
}

function rightChild(i, size) {
  if(i < 0) return -1;
  var r = i * 2 + 2;
  return r >= size ? -1 : r;
}

function parent(i, size) {
  if(i >= size || i <= 0) return -1;
  return Math.floor((i - 1) / 2);
}

function bubbleDown(compareFunc, array, size, i) {
  if(i >= 0 && i < size) {
    var j = i;

    var l = leftChild(i, size);
    if(l >= 0 && compareFunc(array[l], array[j]) > 0) {
      j = l;
    }

    var r = rightChild(i, size);
    if(r >= 0 && compareFunc(array[r], array[j]) > 0) {
      j = r;
    }

    if(j != i) {
      swap(array, size, i, j);
      bubbleDown(compareFunc, array, size, j);
    }
  }
}

function bubbleUp(compareFunc, array, size, i) {
  var p = parent(i, size);
  if(p >= 0 && compareFunc(array[p], array[i]) < 0) {
    swap(array, size, p, i);
    bubbleUp(compareFunc, array, size, p);
  }
}

function Heap(compareFunc) {
  var array = [];
  var size = 0;

  var bubbleUpLocal = bubbleUp.bind(null, compareFunc);
  var bubbleDownLocal = bubbleDown.bind(null, compareFunc);

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

  this.insert = function (value) {
    array[size] = value;
    size++;
    bubbleUpLocal(array, size, size - 1);
  }

  this.pop = function () {
    if(this.isEmpty()) return null;

    var max = array[0];

    swap(array, size, 0, size - 1);
    size--;
    bubbleDownLocal(array, size, 0);

    return max;
  }

  this.peek = function () {
    if(this.isEmpty()) return null;

    return array[0];
  }

  this.build = function (seedArray) {
    array = seedArray;
    size = seedArray.length;

    for(var k = parent(size - 1); k >= 0; k--) {
      bubbleDownLocal(array, size, k);
    }
  }

  this.toString = function () {
    var strs = [];
    array.forEach(function (n) {
      strs.push(n);
    });

    return strs.join(', ');
  }
}

Heap.sort = function (initialArray, compareFunc) {
  var bubbleDownLocal = bubbleDown.bind(null, compareFunc);

  var heap = new Heap(compareFunc);
  heap.build(initialArray);
  (function heapSort(heap, count) {
    if(count > 0) {
      swap(initialArray, count, 0, count - 1);
      bubbleDownLocal(initialArray, count - 1, 0);

      heapSort(heap, count - 1);
    }
  }(heap, initialArray.length));

  initialArray.reverse();

  return initialArray;
};

module.exports = Heap;
