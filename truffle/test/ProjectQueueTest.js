const ProjectQueueMock = artifacts.require("ProjectQueueMock");
const ProjectStub = artifacts.require("ProjectStub");
const exceptions = require('./exceptions');
let accounts;
let mQ;
let p1;
let p2;
let p3;
let p4;
let p5;
let p6;

let basicParams = [11, 5, 8, 2, 3];
let heapifyParams = [11, 5, 8, 2, 9];

contract('ProjectQueue', async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await mockQ();
  })

  describe('empty', async () => {
    it('returns true when queue is empty', async () => {
      let emptyStatus = await mQ.empty();
      assert.equal(emptyStatus, true, 'did not return true with an empty queue');
    })

    it('returns false when the queue is not empty', async () => {
      await populateQ(basicParams);
      let emptyStatus = await mQ.empty();
      assert.equal(emptyStatus, false, 'did not return false with a populated queue');
    })
  })

  describe('leadingProjectAddr', async () => {
    it('returns the address of the leading project', async () => {
      let leadingAddress = await mQ.leadingProjectAddr();
      assert.equal(leadingAddress, p1.address, 'leading project not returned');
    })
  })

  describe('enqueue', async () => {
    let beforeLen;

    before(async () => {
      beforeLen = await parseMethod(getLength);
      p6 = await addProject(10);
      await mQ.enqueue(p6.address);
    })

    it('adds a new project address to the queue', async () => {
      let afterLen = await parseMethod(getLength);
      assert.equal(afterLen, beforeLen + 1, 'project address not added to the queue');
    })

    it('places the address in the correct position', async () => {
      let position = await getMockPosition(p6.address);
      assert.equal(position, 3, 'project address not placed in the correct position');
    })

    it('maintains the integrity of the other address positions', async () => {
      let position1 = await getMockPosition(p1.address);
      let position2 = await getMockPosition(p2.address);
      let position3 = await getMockPosition(p3.address);
      let position4 = await getMockPosition(p4.address);
      let position5 = await getMockPosition(p5.address);
      assert.equal(position1, 1, 'queue integrity not maintained with new addition');
      assert.equal(position2, 2, 'queue integrity not maintained with new addition');
      assert.equal(position3, 6, 'queue integrity not maintained with new addition');
      assert.equal(position4, 4, 'queue integrity not maintained with new addition');
      assert.equal(position5, 5, 'queue integrity not maintained with new addition');
    })

    // it('adds the address to the front of the queue when the queue is empty', async () => {
    //   let p6 = await addProject(10);
    //   await mQ.enqueue(p6.address);
    //   let position = await getMockPosition(p6.address);
    //   assert.equal(position, 1, 'address not added to the front of empty queue');
    // })
  })

  // describe('dequeue', async () => {
  //   it('removes the leading project from the queue', async () => {
  //     await setUp(basicParams);
  //     let beforeLen = await parseMethod(getLength);
  //     let beforeTop = await mQ.leadingProjectAddr();
  //     await mQ.dequeue();
  //     let afterLen = await parseMethod(getLength);
  //     let afterTop = await mQ.leadingProjectAddr();
  //     let position1 = await getMockPosition(p1.address);
  //     assert.equal(afterLen, beforeLen - 1, 'project address not removed from the queue');
  //     assert.notEqual(afterTop, beforeTop, 'leading project not changed');
  //     assert(!position1, 'project address not removed from the queue');
  //   })
  //
  //   it('maintains the integrity of the other address positions', async () => {
  //     await setUp(basicParams);
  //     await mQ.dequeue();
  //     let position1 = await getMockPosition(p1.address);
  //     let position2 = await getMockPosition(p2.address);
  //     let position3 = await getMockPosition(p3.address);
  //     let position4 = await getMockPosition(p4.address);
  //     let position5 = await getMockPosition(p5.address);
  //     assert.equal(position3, 1, 'queue integrity not maintained with new addition');
  //     assert.equal(position2, 2, 'queue integrity not maintained with new addition');
  //     assert.equal(position5, 3, 'queue integrity not maintained with new addition');
  //     assert.equal(position4, 4, 'queue integrity not maintained with new addition');
  //   })
  // })
  //
  // describe('heapify', async () => {
  //   it('moves up the position of an address that beats its parent', async () => {
  //     await setUp([11, 5, 8, 2, 9]);
  //     let proj2Pos1 = await getMockPosition(p2.address);
  //     let proj5Pos1 = await getMockPosition(p5.address);
  //     await mQ.heapify(p5.address);
  //     let proj2Pos2 = await getMockPosition(p2.address);
  //     let proj5Pos2 = await getMockPosition(p5.address);
  //     assert.equal(proj2Pos2, proj5Pos1, 'positions not updated properly');
  //     assert.equal(proj5Pos2, proj2Pos1, 'positions not updated properly');
  //   })
  //
  //   it('moves down the position of an address that does not beat its child', async () => {
  //     await setUp([11, 1, 8, 2, 3]);
  //     let proj2Pos1 = await getMockPosition(p2.address);
  //     let proj5Pos1 = await getMockPosition(p5.address);
  //     await mQ.heapify(p2.address);
  //     let proj2Pos2 = await getMockPosition(p2.address);
  //     let proj5Pos2 = await getMockPosition(p5.address);
  //     assert.equal(proj2Pos2, proj5Pos1, 'positions not updated properly');
  //     assert.equal(proj5Pos2, proj2Pos1, 'positions not updated properly');
  //   })
  //
  //   it('maintains the integrity of the other address positions', async () => {
  //     await setUp([11, 5, 8, 2, 9]);
  //     await mQ.heapify(p5.address);
  //     let proj1Pos = await getMockPosition(p1.address);
  //     let proj3Pos = await getMockPosition(p3.address);
  //     let proj4Pos = await getMockPosition(p4.address);
  //     assert.equal(proj1Pos, 1, 'queue integrity not maintained with new addition');
  //     assert.equal(proj3Pos, 3, 'queue integrity not maintained with new addition');
  //     assert.equal(proj4Pos, 4, 'queue integrity not maintained with new addition');
  //   })
  //
  //   it('can move an address up or down multiple positions', async () => {
  //     await setUp([11, 5, 8, 2, 15]);
  //     let proj1Pos1 = await getMockPosition(p1.address);
  //     let proj5Pos1 = await getMockPosition(p5.address);
  //     await mQ.heapify(p5.address);
  //     let proj1Pos2 = await getMockPosition(p1.address);
  //     let proj5Pos2 = await getMockPosition(p5.address);
  //     assert.equal(proj1Pos2, 2, 'positions not updated properly');
  //     assert.equal(proj5Pos2, proj1Pos1, 'positions not updated properly');
  //   })
  // })
})

// const setUp = async (params) => {
//   p1 = await addProject(params[0]);
//   p2 = await addProject(params[1]);
//   p3 = await addProject(params[2]);
//   p4 = await addProject(params[3]);
//   p5 = await addProject(params[4]);
//
//
//   await mQ.init(p1.address, p2.address, p3.address, p4.address, p5.address);
// }

const populateQ = async (params) => {
  p1 = await addProject(params[0]);
  p2 = await addProject(params[1]);
  p3 = await addProject(params[2]);
  p4 = await addProject(params[3]);
  p5 = await addProject(params[4]);


  await mQ.init(p1.address, p2.address, p3.address, p4.address, p5.address);
}

const mockQ = async () => {
  mQ = await ProjectQueueMock.new();
}

const enqueue = async () => {
  await mQ.enqueue()
}

const addProject = async (value) => {
 return await ProjectStub.new(value, 'p1', accounts[0], 1000000, 2000000, 100, 100, '300', '300', value);
}

const getLength = async () => {
  return await mQ.len.call();
}

const getMockPosition = async (address) => {
  let p = await mQ.mockPositionOf.call(address);
  return parseBN(p);
}

const parseMethod = async (method) => {
  let bN = await method();
  return parseBN(bN);
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}
