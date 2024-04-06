const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the conflicts response APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all conflicts responses
 * (3) Store conflicts response
 * (4) Get single conflicts response
 * (5) Update conflicts response
 * (6) Delete conflicts response
 */

describe('ConflictsResponse', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ConflictsResponse.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, conflicts responseData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for conflicts response', (done) => {
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
  describe('/GET All conflicts responses', () => {
    it('it should GET all the conflicts responses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflicts responses')
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
  describe('/POST ConflictsResponse store blank data submited', () => {
    it('It should send validation error for store conflicts response', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflicts response')
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
  describe('/POST ConflictsResponse store', () => {
    it('It should store conflicts response', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflicts response')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          conflicts responseData = res.body.data;
          createdID.push(conflicts responseData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id conflicts response', () => {
    it('it should GET the conflicts response', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflicts response/' + conflicts responseData.id)
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
  describe('/PUT/:id conflicts response', () => {
    it('it should not update the conflicts response', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/conflicts response/' + conflicts responseData.id)
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
  describe('/PUT/:id conflicts response', () => {
    it('it should PUT the conflicts response', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/conflicts response/' + conflicts responseData.id)
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
  describe('/DELETE/:id conflicts response', () => {
    it('it should DELETE the conflicts response', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/conflicts response/' + conflicts responseData.id)
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
      db.ConflictsResponse.findByIdAndRemove(id);
    });
    done();
  });
});
