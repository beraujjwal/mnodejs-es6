const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the billing cycle APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all billing cycles
 * (3) Store billing cycle
 * (4) Get single billing cycle
 * (5) Update billing cycle
 * (6) Delete billing cycle
 */

describe('BillingCycle', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.BillingCycle.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, billing cycleData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for billing cycle', (done) => {
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
  describe('/GET All billing cycles', () => {
    it('it should GET all the billing cycles', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/billing cycles')
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
  describe('/POST BillingCycle store blank data submited', () => {
    it('It should send validation error for store billing cycle', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/billing cycle')
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
  describe('/POST BillingCycle store', () => {
    it('It should store billing cycle', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/billing cycle')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          billing cycleData = res.body.data;
          createdID.push(billing cycleData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id billing cycle', () => {
    it('it should GET the billing cycle', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/billing cycle/' + billing cycleData.id)
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
  describe('/PUT/:id billing cycle', () => {
    it('it should not update the billing cycle', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/billing cycle/' + billing cycleData.id)
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
  describe('/PUT/:id billing cycle', () => {
    it('it should PUT the billing cycle', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/billing cycle/' + billing cycleData.id)
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
  describe('/DELETE/:id billing cycle', () => {
    it('it should DELETE the billing cycle', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/billing cycle/' + billing cycleData.id)
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
      db.BillingCycle.findByIdAndRemove(id);
    });
    done();
  });
});
