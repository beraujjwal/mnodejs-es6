const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the carrier marketing source APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all carrier marketing sources
 * (3) Store carrier marketing source
 * (4) Get single carrier marketing source
 * (5) Update carrier marketing source
 * (6) Delete carrier marketing source
 */

describe('CarrierMarketingSource', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.CarrierMarketingSource.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, carrier marketing sourceData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for carrier marketing source', (done) => {
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
  describe('/GET All carrier marketing sources', () => {
    it('it should GET all the carrier marketing sources', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier marketing sources')
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
  describe('/POST CarrierMarketingSource store blank data submited', () => {
    it('It should send validation error for store carrier marketing source', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier marketing source')
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
  describe('/POST CarrierMarketingSource store', () => {
    it('It should store carrier marketing source', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier marketing source')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          carrier marketing sourceData = res.body.data;
          createdID.push(carrier marketing sourceData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id carrier marketing source', () => {
    it('it should GET the carrier marketing source', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier marketing source/' + carrier marketing sourceData.id)
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
  describe('/PUT/:id carrier marketing source', () => {
    it('it should not update the carrier marketing source', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/carrier marketing source/' + carrier marketing sourceData.id)
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
  describe('/PUT/:id carrier marketing source', () => {
    it('it should PUT the carrier marketing source', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/carrier marketing source/' + carrier marketing sourceData.id)
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
  describe('/DELETE/:id carrier marketing source', () => {
    it('it should DELETE the carrier marketing source', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/carrier marketing source/' + carrier marketing sourceData.id)
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
      db.CarrierMarketingSource.findByIdAndRemove(id);
    });
    done();
  });
});
