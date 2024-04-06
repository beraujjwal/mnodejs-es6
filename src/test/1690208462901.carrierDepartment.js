const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the carrier department APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all carrier departments
 * (3) Store carrier department
 * (4) Get single carrier department
 * (5) Update carrier department
 * (6) Delete carrier department
 */

describe('CarrierDepartment', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.CarrierDepartment.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, carrier departmentData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for carrier department', (done) => {
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
  describe('/GET All carrier departments', () => {
    it('it should GET all the carrier departments', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier departments')
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
  describe('/POST CarrierDepartment store blank data submited', () => {
    it('It should send validation error for store carrier department', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier department')
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
  describe('/POST CarrierDepartment store', () => {
    it('It should store carrier department', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carrier department')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          carrier departmentData = res.body.data;
          createdID.push(carrier departmentData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id carrier department', () => {
    it('it should GET the carrier department', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carrier department/' + carrier departmentData.id)
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
  describe('/PUT/:id carrier department', () => {
    it('it should not update the carrier department', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/carrier department/' + carrier departmentData.id)
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
  describe('/PUT/:id carrier department', () => {
    it('it should PUT the carrier department', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/carrier department/' + carrier departmentData.id)
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
  describe('/DELETE/:id carrier department', () => {
    it('it should DELETE the carrier department', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/carrier department/' + carrier departmentData.id)
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
      db.CarrierDepartment.findByIdAndRemove(id);
    });
    done();
  });
});
