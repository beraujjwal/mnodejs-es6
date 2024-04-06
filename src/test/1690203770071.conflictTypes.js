const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the conflict type APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all conflict types
 * (3) Store conflict type
 * (4) Get single conflict type
 * (5) Update conflict type
 * (6) Delete conflict type
 */

describe('ConflictType', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ConflictType.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, conflict typeData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for conflict type', (done) => {
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
  describe('/GET All conflict types', () => {
    it('it should GET all the conflict types', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict types')
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
  describe('/POST ConflictType store blank data submited', () => {
    it('It should send validation error for store conflict type', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict type')
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
  describe('/POST ConflictType store', () => {
    it('It should store conflict type', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict type')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          conflict typeData = res.body.data;
          createdID.push(conflict typeData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id conflict type', () => {
    it('it should GET the conflict type', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict type/' + conflict typeData.id)
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
  describe('/PUT/:id conflict type', () => {
    it('it should not update the conflict type', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/conflict type/' + conflict typeData.id)
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
  describe('/PUT/:id conflict type', () => {
    it('it should PUT the conflict type', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/conflict type/' + conflict typeData.id)
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
  describe('/DELETE/:id conflict type', () => {
    it('it should DELETE the conflict type', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/conflict type/' + conflict typeData.id)
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
      db.ConflictType.findByIdAndRemove(id);
    });
    done();
  });
});
