const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the document required APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all document requireds
 * (3) Store document required
 * (4) Get single document required
 * (5) Update document required
 * (6) Delete document required
 */

describe('DocumentRequired', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.DocumentRequired.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, document requiredData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for document required', (done) => {
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
  describe('/GET All document requireds', () => {
    it('it should GET all the document requireds', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/document requireds')
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
  describe('/POST DocumentRequired store blank data submited', () => {
    it('It should send validation error for store document required', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/document required')
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
  describe('/POST DocumentRequired store', () => {
    it('It should store document required', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/document required')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          document requiredData = res.body.data;
          createdID.push(document requiredData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id document required', () => {
    it('it should GET the document required', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/document required/' + document requiredData.id)
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
  describe('/PUT/:id document required', () => {
    it('it should not update the document required', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/document required/' + document requiredData.id)
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
  describe('/PUT/:id document required', () => {
    it('it should PUT the document required', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/document required/' + document requiredData.id)
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
  describe('/DELETE/:id document required', () => {
    it('it should DELETE the document required', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/document required/' + document requiredData.id)
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
      db.DocumentRequired.findByIdAndRemove(id);
    });
    done();
  });
});
