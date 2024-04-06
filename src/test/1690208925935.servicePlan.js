const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the service plan APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all service plans
 * (3) Store service plan
 * (4) Get single service plan
 * (5) Update service plan
 * (6) Delete service plan
 */

describe('ServicePlan', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ServicePlan.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, service planData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for service plan', (done) => {
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
  describe('/GET All service plans', () => {
    it('it should GET all the service plans', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/service plans')
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
  describe('/POST ServicePlan store blank data submited', () => {
    it('It should send validation error for store service plan', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/service plan')
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
  describe('/POST ServicePlan store', () => {
    it('It should store service plan', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/service plan')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          service planData = res.body.data;
          createdID.push(service planData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id service plan', () => {
    it('it should GET the service plan', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/service plan/' + service planData.id)
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
  describe('/PUT/:id service plan', () => {
    it('it should not update the service plan', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/service plan/' + service planData.id)
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
  describe('/PUT/:id service plan', () => {
    it('it should PUT the service plan', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/service plan/' + service planData.id)
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
  describe('/DELETE/:id service plan', () => {
    it('it should DELETE the service plan', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/service plan/' + service planData.id)
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
      db.ServicePlan.findByIdAndRemove(id);
    });
    done();
  });
});
