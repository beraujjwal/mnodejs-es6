const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the conflict status APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all conflict statuses
 * (3) Store conflict status
 * (4) Get single conflict status
 * (5) Update conflict status
 * (6) Delete conflict status
 */

describe('ConflictStatus', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ConflictStatus.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, conflict statusData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for conflict status', (done) => {
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
  describe('/GET All conflict statuses', () => {
    it('it should GET all the conflict statuses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict statuses')
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
  describe('/POST ConflictStatus store blank data submited', () => {
    it('It should send validation error for store conflict status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict status')
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
  describe('/POST ConflictStatus store', () => {
    it('It should store conflict status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict status')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          conflict statusData = res.body.data;
          createdID.push(conflict statusData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id conflict status', () => {
    it('it should GET the conflict status', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict status/' + conflict statusData.id)
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
  describe('/PUT/:id conflict status', () => {
    it('it should not update the conflict status', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/conflict status/' + conflict statusData.id)
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
  describe('/PUT/:id conflict status', () => {
    it('it should PUT the conflict status', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/conflict status/' + conflict statusData.id)
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
  describe('/DELETE/:id conflict status', () => {
    it('it should DELETE the conflict status', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/conflict status/' + conflict statusData.id)
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
      db.ConflictStatus.findByIdAndRemove(id);
    });
    done();
  });
});
