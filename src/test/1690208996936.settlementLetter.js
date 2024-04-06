const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the settlement letter APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all settlement letters
 * (3) Store settlement letter
 * (4) Get single settlement letter
 * (5) Update settlement letter
 * (6) Delete settlement letter
 */

describe('SettlementLetter', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.SettlementLetter.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, settlement letterData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for settlement letter', (done) => {
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
  describe('/GET All settlement letters', () => {
    it('it should GET all the settlement letters', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlement letters')
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
  describe('/POST SettlementLetter store blank data submited', () => {
    it('It should send validation error for store settlement letter', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement letter')
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
  describe('/POST SettlementLetter store', () => {
    it('It should store settlement letter', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/settlement letter')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          settlement letterData = res.body.data;
          createdID.push(settlement letterData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id settlement letter', () => {
    it('it should GET the settlement letter', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/settlement letter/' + settlement letterData.id)
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
  describe('/PUT/:id settlement letter', () => {
    it('it should not update the settlement letter', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/settlement letter/' + settlement letterData.id)
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
  describe('/PUT/:id settlement letter', () => {
    it('it should PUT the settlement letter', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/settlement letter/' + settlement letterData.id)
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
  describe('/DELETE/:id settlement letter', () => {
    it('it should DELETE the settlement letter', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/settlement letter/' + settlement letterData.id)
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
      db.SettlementLetter.findByIdAndRemove(id);
    });
    done();
  });
});
