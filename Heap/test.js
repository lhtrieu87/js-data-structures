var Heap = require('./Heap');
var should = require('should');

describe('Heap', function () {
  var heap = new Heap(function (a, b) {
    if(a < b) return 1;
    else if(a > b) return -1;
    else return 0;
  });
  beforeEach(function () {
    heap.clear();
  });

  it('build', function () {
    heap.build([]);
    heap.getSize().should.equal(0);
    heap.isEmpty().should.equal(true);

    heap.build([4]);
    heap.toString().should.equal('4');
    heap.getSize().should.equal(1);
    heap.isEmpty().should.equal(false);

    heap.clear();

    var seed = [4, 1, 3, 2, 16, 9, 10, 14, 8, 0];
    heap.build(seed);

    heap.toString().should.equal('0, 1, 3, 2, 4, 9, 10, 14, 8, 16');
    heap.getSize().should.equal(seed.length);
    heap.isEmpty().should.equal(false);
  });

  it('insert', function () {
    heap.isEmpty().should.be.ok;

    heap.insert(1);
    heap.getSize().should.equal(1);

    heap.insert(3);
    heap.getSize().should.equal(2);

    heap.insert(2);
    heap.getSize().should.equal(3);
    heap.toString().should.equal('1, 3, 2');

    heap.insert(-1);
    heap.getSize().should.equal(4);
    heap.toString().should.equal('-1, 1, 2, 3');

    heap.insert(0);
    heap.getSize().should.equal(5);
    heap.toString().should.equal('-1, 0, 2, 3, 1');
  });

  it('pop', function () {
    var max = heap.pop();
    should.not.exist(max);

    var Node = Heap.Node;
    var seed = [4, 1, 3, 2, 16, 9, 10, 14, 8, 0];
    heap.build(seed);

    max = heap.pop();
    max.should.equal(0);
    heap.getSize().should.equal(9);

    max = heap.pop();
    max.should.equal(1);
    heap.getSize().should.equal(8);
  });

  it('peek', function () {
    var max = heap.peek();
    should.not.exist(max);

    var Node = Heap.Node;
    var seed = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
    heap.build(seed);

    max = heap.peek();
    max.should.equal(1);
    heap.getSize().should.equal(10);
  });

  it('heap sort', function () {
    var Node = Heap.Node;
    var initialList = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
    var sortedList = Heap.sort(initialList, function (a, b) {
      if(a < b) return 1;
      else if(a > b) return -1;
      else return 0;
    });

    // In-place sort.
    sortedList.should.equal(initialList);

    sortedList[9].should.equal(16);
    sortedList[8].should.equal(14);
    sortedList[7].should.equal(10);
    sortedList[6].should.equal(9);
    sortedList[5].should.equal(8);
    sortedList[4].should.equal(7);
    sortedList[3].should.equal(4);
    sortedList[2].should.equal(3);
    sortedList[1].should.equal(2);
    sortedList[0].should.equal(1);
  });
})
