const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the valuation protection APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all valuation protections
 * (3) Store valuation protection
 * (4) Get single valuation protection
 * (5) Update valuation protection
 * (6) Delete valuation protection
 */

describe('ValuationProtection', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ValuationProtection.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, valuation protectionData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for valuation protection', (done) => {
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
  describe('/GET All valuation protections', () => {
    it('it should GET all the valuation protections', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/valuation protections')
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
  describe('/POST ValuationProtection store blank data submited', () => {
    it('It should send validation error for store valuation protection', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/valuation protection')
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
  describe('/POST ValuationProtection store', () => {
    it('It should store valuation protection', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/valuation protection')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          valuation protectionData = res.body.data;
          createdID.push(valuation protectionData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id valuation protection', () => {
    it('it should GET the valuation protection', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/valuation protection/' + valuation protectionData.id)
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
  describe('/PUT/:id valuation protection', () => {
    it('it should not update the valuation protection', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/valuation protection/' + valuation protectionData.id)
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
  describe('/PUT/:id valuation protection', () => {
    it('it should PUT the valuation protection', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/valuation protection/' + valuation protectionData.id)
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
  describe('/DELETE/:id valuation protection', () => {
    it('it should DELETE the valuation protection', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/valuation protection/' + valuation protectionData.id)
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
      db.ValuationProtection.findByIdAndRemove(id);
    });
    done();
  });
});
