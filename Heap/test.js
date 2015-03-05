var Heap = require('./Heap');
var should = require('should');

describe('Heap', function () {
  var heap = new Heap();
  beforeEach(function () {
    heap.clear();
  });

  it('build', function () {
    var Node = Heap.Node;
    
    heap.build([]);
    heap.getSize().should.equal(0);
    heap.isEmpty().should.equal(true);

    heap.build([new Node(4, 4)]);
    heap.toString().should.equal('(4, 4)');
    heap.getSize().should.equal(1);
    heap.isEmpty().should.equal(false);

    heap.clear();

    var seed = [new Node(4, 4), new Node(1, 1), new Node(3, 3), new Node(2, 2), new Node(16, 16), new Node(9, 9), new Node(10, 10), new Node(14, 14), new Node(8, 8), new Node(7, 7)];
    heap.build(seed);

    heap.toString().should.equal('(16, 16), (14, 14), (10, 10), (8, 8), (7, 7), (9, 9), (3, 3), (2, 2), (4, 4), (1, 1)');
    heap.getSize().should.equal(seed.length);
    heap.isEmpty().should.equal(false);
  });

  it('insert', function () {
    heap.isEmpty().should.be.ok;

    heap.insert(1, 1);
    heap.getSize().should.equal(1);

    heap.insert(3, 3);
    heap.getSize().should.equal(2);

    heap.insert(2, 2);
    heap.getSize().should.equal(3);
    heap.toString().should.equal('(3, 3), (1, 1), (2, 2)');

    heap.insert(5, 5);
    heap.getSize().should.equal(4);
    heap.toString().should.equal('(5, 5), (3, 3), (2, 2), (1, 1)');
  });

  it('pop', function () {
    var max = heap.pop();
    should.not.exist(max);

    var Node = Heap.Node;
    var seed = [new Node(4, 4), new Node(1, 1), new Node(3, 3), new Node(2, 2), new Node(16, 16), new Node(9, 9), new Node(10, 10), new Node(14, 14), new Node(8, 8), new Node(7, 7)];
    heap.build(seed);

    max = heap.pop();
    max.key.should.equal(16);
    max.value.should.equal(16);

    max = heap.pop();
    max.key.should.equal(14);
    max.value.should.equal(14);
  });

  it('peek', function () {
    var max = heap.peek();
    should.not.exist(max);

    var Node = Heap.Node;
    var seed = [new Node(4, 4), new Node(1, 1), new Node(3, 3), new Node(2, 2), new Node(16, 16), new Node(9, 9), new Node(10, 10), new Node(14, 14), new Node(8, 8), new Node(7, 7)];
    heap.build(seed);

    max = heap.peek();
    max.key.should.equal(16);
    max.value.should.equal(16);
  });
})