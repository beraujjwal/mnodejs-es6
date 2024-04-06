const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the claim status APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all claim statuses
 * (3) Store claim status
 * (4) Get single claim status
 * (5) Update claim status
 * (6) Delete claim status
 */

describe('ClaimStatus', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ClaimStatus.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, claim statusData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for claim status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/auth/signin')
        .send({
          username: userTestData.username,
          password: userTestData.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          loginResponse = res.body.data;
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET All claim statuses', () => {
    it('it should GET all the claim statuses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim statuses')
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST ClaimStatus store blank data submited', () => {
    it('It should send validation error for store claim status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim status')
        .send()
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(true);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST ClaimStatus store', () => {
    it('It should store claim status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim status')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          claim statusData = res.body.data;
          createdID.push(claim statusData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id claim status', () => {
    it('it should GET the claim status', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim status/' + claim statusData.id)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id claim status', () => {
    it('it should not update the claim status', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/claim status/' + claim statusData.id)
        .send()
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(true);
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id claim status', () => {
    it('it should PUT the claim status', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/claim status/' + claim statusData.id)
        .send(updatedTestData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id claim status', () => {
    it('it should DELETE the claim status', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/claim status/' + claim statusData.id)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          done();
        });
    });
  });

  after((done) => {
    createdID.forEach((id) => {
      db.ClaimStatus.findByIdAndRemove(id);
    });
    done();
  });
});
