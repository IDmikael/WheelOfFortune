// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Requests Test', function () {

  describe('GET /score', function(){

    it("should get score", (done) => {
    	chai.request(app)
        	.get('/score')
        	.end((err, res) => {
            	res.should.have.status(200);
            	res.body.should.be.an('object');
            	res.body.score.should.be.a('number');

            	done();
         	});
    });
  });

  describe('GET /segments', function(){

    it("should get array of segments", (done) => {
    	chai.request(app)
        	.get('/segments')
        	.end((err, res) => {
            	res.should.have.status(200);
            	res.body.should.be.an('object');
            	res.body.segmentsArray.should.be.an('array');
            	res.body.segmentsArray.should.not.be.empty;
            	done();
         	});
    });
  });

  describe('POST /spin', function(){

    it("should return random number", (done) => {
    	chai.request(app)
        	.post('/spin')
        	.end((err, res) => {
            	res.should.have.status(200);
            	res.body.should.be.an('object');
            	res.body.selectedSegment.should.be.a('number');
            	done();
         	});
    });
  });

});