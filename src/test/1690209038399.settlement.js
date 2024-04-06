const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the settlement APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all settlements
 * (3) Store settlement
 * (4) Get single settlement
 * (5) Update settlement
 * (6) Delete settlement
 */

describe('Settlement', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.Settlement.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, settlementData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for settlement', (done) => {
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
  describe('/GET All settlements', () => {
    it('it should GET all the settlements', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlements')
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
  describe('/POST Settlement store blank data submited', () => {
    it('It should send validation error for store settlement', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement')
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
  describe('/POST Settlement store', () => {
    it('It should store settlement', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          settlementData = res.body.data;
          createdID.push(settlementData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id settlement', () => {
    it('it should GET the settlement', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlement/' + settlementData.id)
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
  describe('/PUT/:id settlement', () => {
    it('it should not update the settlement', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/settlement/' + settlementData.id)
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
  describe('/PUT/:id settlement', () => {
    it('it should PUT the settlement', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/settlement/' + settlementData.id)
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
  describe('/DELETE/:id settlement', () => {
    it('it should DELETE the settlement', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/settlement/' + settlementData.id)
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
      db.Settlement.findByIdAndRemove(id);
    });
    done();
  });
});
