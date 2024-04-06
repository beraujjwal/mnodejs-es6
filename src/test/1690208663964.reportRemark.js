const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the report remark APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all report remarks
 * (3) Store report remark
 * (4) Get single report remark
 * (5) Update report remark
 * (6) Delete report remark
 */

describe('ReportRemark', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ReportRemark.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, report remarkData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for report remark', (done) => {
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
  describe('/GET All report remarks', () => {
    it('it should GET all the report remarks', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/report remarks')
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
  describe('/POST ReportRemark store blank data submited', () => {
    it('It should send validation error for store report remark', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/report remark')
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
  describe('/POST ReportRemark store', () => {
    it('It should store report remark', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/report remark')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          report remarkData = res.body.data;
          createdID.push(report remarkData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id report remark', () => {
    it('it should GET the report remark', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/report remark/' + report remarkData.id)
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
  describe('/PUT/:id report remark', () => {
    it('it should not update the report remark', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/report remark/' + report remarkData.id)
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
  describe('/PUT/:id report remark', () => {
    it('it should PUT the report remark', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/report remark/' + report remarkData.id)
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
  describe('/DELETE/:id report remark', () => {
    it('it should DELETE the report remark', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/report remark/' + report remarkData.id)
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
      db.ReportRemark.findByIdAndRemove(id);
    });
    done();
  });
});
