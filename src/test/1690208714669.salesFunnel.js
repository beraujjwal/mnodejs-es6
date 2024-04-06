const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the sales funnel APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all sales funnels
 * (3) Store sales funnel
 * (4) Get single sales funnel
 * (5) Update sales funnel
 * (6) Delete sales funnel
 */

describe('SalesFunnel', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.SalesFunnel.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, sales funnelData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for sales funnel', (done) => {
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
  describe('/GET All sales funnels', () => {
    it('it should GET all the sales funnels', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/sales funnels')
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
  describe('/POST SalesFunnel store blank data submited', () => {
    it('It should send validation error for store sales funnel', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/sales funnel')
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
  describe('/POST SalesFunnel store', () => {
    it('It should store sales funnel', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/sales funnel')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          sales funnelData = res.body.data;
          createdID.push(sales funnelData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id sales funnel', () => {
    it('it should GET the sales funnel', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/sales funnel/' + sales funnelData.id)
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
  describe('/PUT/:id sales funnel', () => {
    it('it should not update the sales funnel', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/sales funnel/' + sales funnelData.id)
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
  describe('/PUT/:id sales funnel', () => {
    it('it should PUT the sales funnel', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/sales funnel/' + sales funnelData.id)
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
  describe('/DELETE/:id sales funnel', () => {
    it('it should DELETE the sales funnel', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/sales funnel/' + sales funnelData.id)
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
      db.SalesFunnel.findByIdAndRemove(id);
    });
    done();
  });
});
