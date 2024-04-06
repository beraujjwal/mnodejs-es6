const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the settlement ruling APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all settlement rulings
 * (3) Store settlement ruling
 * (4) Get single settlement ruling
 * (5) Update settlement ruling
 * (6) Delete settlement ruling
 */

describe('SettlementRuling', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.SettlementRuling.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, settlement rulingData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for settlement ruling', (done) => {
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
  describe('/GET All settlement rulings', () => {
    it('it should GET all the settlement rulings', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlement rulings')
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
  describe('/POST SettlementRuling store blank data submited', () => {
    it('It should send validation error for store settlement ruling', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement ruling')
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
  describe('/POST SettlementRuling store', () => {
    it('It should store settlement ruling', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement ruling')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          settlement rulingData = res.body.data;
          createdID.push(settlement rulingData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id settlement ruling', () => {
    it('it should GET the settlement ruling', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlement ruling/' + settlement rulingData.id)
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
  describe('/PUT/:id settlement ruling', () => {
    it('it should not update the settlement ruling', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/settlement ruling/' + settlement rulingData.id)
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
  describe('/PUT/:id settlement ruling', () => {
    it('it should PUT the settlement ruling', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/settlement ruling/' + settlement rulingData.id)
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
  describe('/DELETE/:id settlement ruling', () => {
    it('it should DELETE the settlement ruling', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/settlement ruling/' + settlement rulingData.id)
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
      db.SettlementRuling.findByIdAndRemove(id);
    });
    done();
  });
});
