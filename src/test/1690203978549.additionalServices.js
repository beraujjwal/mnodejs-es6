const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the additional service APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all additional services
 * (3) Store additional service
 * (4) Get single additional service
 * (5) Update additional service
 * (6) Delete additional service
 */

describe('AdditionalService', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.AdditionalService.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, additional serviceData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for additional service', (done) => {
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
  describe('/GET All additional services', () => {
    it('it should GET all the additional services', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/additional services')
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
  describe('/POST AdditionalService store blank data submited', () => {
    it('It should send validation error for store additional service', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/additional service')
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
  describe('/POST AdditionalService store', () => {
    it('It should store additional service', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/additional service')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          additional serviceData = res.body.data;
          createdID.push(additional serviceData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id additional service', () => {
    it('it should GET the additional service', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/additional service/' + additional serviceData.id)
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
  describe('/PUT/:id additional service', () => {
    it('it should not update the additional service', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/additional service/' + additional serviceData.id)
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
  describe('/PUT/:id additional service', () => {
    it('it should PUT the additional service', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/additional service/' + additional serviceData.id)
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
  describe('/DELETE/:id additional service', () => {
    it('it should DELETE the additional service', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/additional service/' + additional serviceData.id)
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
      db.AdditionalService.findByIdAndRemove(id);
    });
    done();
  });
});
