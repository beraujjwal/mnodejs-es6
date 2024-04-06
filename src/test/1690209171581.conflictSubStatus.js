const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the conflict sub status APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all conflict sub statuses
 * (3) Store conflict sub status
 * (4) Get single conflict sub status
 * (5) Update conflict sub status
 * (6) Delete conflict sub status
 */

describe('ConflictSubStatus', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ConflictSubStatus.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, conflict sub statusData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for conflict sub status', (done) => {
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
  describe('/GET All conflict sub statuses', () => {
    it('it should GET all the conflict sub statuses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict sub statuses')
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
  describe('/POST ConflictSubStatus store blank data submited', () => {
    it('It should send validation error for store conflict sub status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict sub status')
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
  describe('/POST ConflictSubStatus store', () => {
    it('It should store conflict sub status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict sub status')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          conflict sub statusData = res.body.data;
          createdID.push(conflict sub statusData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id conflict sub status', () => {
    it('it should GET the conflict sub status', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict sub status/' + conflict sub statusData.id)
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
  describe('/PUT/:id conflict sub status', () => {
    it('it should not update the conflict sub status', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/conflict sub status/' + conflict sub statusData.id)
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
  describe('/PUT/:id conflict sub status', () => {
    it('it should PUT the conflict sub status', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/conflict sub status/' + conflict sub statusData.id)
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
  describe('/DELETE/:id conflict sub status', () => {
    it('it should DELETE the conflict sub status', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/conflict sub status/' + conflict sub statusData.id)
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
      db.ConflictSubStatus.findByIdAndRemove(id);
    });
    done();
  });
});
