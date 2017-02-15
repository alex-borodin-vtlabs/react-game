const server = require('./server')
const Chai = require('chai')
const assert = Chai.assert

const getOpts = {
  method: 'GET',
  url: '/results'
}

console.log(server)
describe('Server', () => {
	it('should get scores', () => {
    server.server.inject(getOpts, function (res) {
      assert.equal(res.statusCode, 200)
    })
  });
});
