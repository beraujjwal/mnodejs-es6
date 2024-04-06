const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the sales status APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all sales statuses
 * (3) Store sales status
 * (4) Get single sales status
 * (5) Update sales status
 * (6) Delete sales status
 */

describe('SalesStatus', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.SalesStatus.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, sales statusData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for sales status', (done) => {
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
  describe('/GET All sales statuses', () => {
    it('it should GET all the sales statuses', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/sales statuses')
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
  describe('/POST SalesStatus store blank data submited', () => {
    it('It should send validation error for store sales status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/sales status')
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
  describe('/POST SalesStatus store', () => {
    it('It should store sales status', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/sales status')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          sales statusData = res.body.data;
          createdID.push(sales statusData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id sales status', () => {
    it('it should GET the sales status', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/sales status/' + sales statusData.id)
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
  describe('/PUT/:id sales status', () => {
    it('it should not update the sales status', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/sales status/' + sales statusData.id)
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
  describe('/PUT/:id sales status', () => {
    it('it should PUT the sales status', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/sales status/' + sales statusData.id)
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
  describe('/DELETE/:id sales status', () => {
    it('it should DELETE the sales status', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/sales status/' + sales statusData.id)
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
      db.SalesStatus.findByIdAndRemove(id);
    });
    done();
  });
});
