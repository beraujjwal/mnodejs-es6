const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the claim sub status APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all claim sub statuses
 * (3) Store claim sub status
 * (4) Get single claim sub status
 * (5) Update claim sub status
 * (6) Delete claim sub status
 */

describe('ClaimSubStatus', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ClaimSubStatus.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, claim sub statusData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for claim sub status', (done) => {
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
  describe('/GET All claim sub statuses', () => {
    it('it should GET all the claim sub statuses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim sub statuses')
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
  describe('/POST ClaimSubStatus store blank data submited', () => {
    it('It should send validation error for store claim sub status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim sub status')
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
  describe('/POST ClaimSubStatus store', () => {
    it('It should store claim sub status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim sub status')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          claim sub statusData = res.body.data;
          createdID.push(claim sub statusData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id claim sub status', () => {
    it('it should GET the claim sub status', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim sub status/' + claim sub statusData.id)
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
  describe('/PUT/:id claim sub status', () => {
    it('it should not update the claim sub status', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/claim sub status/' + claim sub statusData.id)
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
  describe('/PUT/:id claim sub status', () => {
    it('it should PUT the claim sub status', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/claim sub status/' + claim sub statusData.id)
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
  describe('/DELETE/:id claim sub status', () => {
    it('it should DELETE the claim sub status', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/claim sub status/' + claim sub statusData.id)
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
      db.ClaimSubStatus.findByIdAndRemove(id);
    });
    done();
  });
});
