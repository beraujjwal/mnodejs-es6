const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the claim type APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all claim types
 * (3) Store claim type
 * (4) Get single claim type
 * (5) Update claim type
 * (6) Delete claim type
 */

describe('ClaimType', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ClaimType.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, claim typeData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for claim type', (done) => {
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
  describe('/GET All claim types', () => {
    it('it should GET all the claim types', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim types')
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
  describe('/POST ClaimType store blank data submited', () => {
    it('It should send validation error for store claim type', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim type')
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
  describe('/POST ClaimType store', () => {
    it('It should store claim type', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/claim type')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          claim typeData = res.body.data;
          createdID.push(claim typeData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id claim type', () => {
    it('it should GET the claim type', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/claim type/' + claim typeData.id)
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
  describe('/PUT/:id claim type', () => {
    it('it should not update the claim type', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/claim type/' + claim typeData.id)
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
  describe('/PUT/:id claim type', () => {
    it('it should PUT the claim type', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/claim type/' + claim typeData.id)
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
  describe('/DELETE/:id claim type', () => {
    it('it should DELETE the claim type', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/claim type/' + claim typeData.id)
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
      db.ClaimType.findByIdAndRemove(id);
    });
    done();
  });
});
