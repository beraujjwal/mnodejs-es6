const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the carrier service APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all carrier services
 * (3) Store carrier service
 * (4) Get single carrier service
 * (5) Update carrier service
 * (6) Delete carrier service
 */

describe('CarrierService', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.CarrierService.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, carrier serviceData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for carrier service', (done) => {
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
  describe('/GET All carrier services', () => {
    it('it should GET all the carrier services', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier services')
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
  describe('/POST CarrierService store blank data submited', () => {
    it('It should send validation error for store carrier service', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier service')
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
  describe('/POST CarrierService store', () => {
    it('It should store carrier service', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier service')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          carrier serviceData = res.body.data;
          createdID.push(carrier serviceData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id carrier service', () => {
    it('it should GET the carrier service', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier service/' + carrier serviceData.id)
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
  describe('/PUT/:id carrier service', () => {
    it('it should not update the carrier service', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/carrier service/' + carrier serviceData.id)
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
  describe('/PUT/:id carrier service', () => {
    it('it should PUT the carrier service', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/carrier service/' + carrier serviceData.id)
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
  describe('/DELETE/:id carrier service', () => {
    it('it should DELETE the carrier service', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/carrier service/' + carrier serviceData.id)
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
      db.CarrierService.findByIdAndRemove(id);
    });
    done();
  });
});
