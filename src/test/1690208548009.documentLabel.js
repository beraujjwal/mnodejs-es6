const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the document label APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all document labels
 * (3) Store document label
 * (4) Get single document label
 * (5) Update document label
 * (6) Delete document label
 */

describe('DocumentLabel', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.DocumentLabel.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, document labelData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for document label', (done) => {
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
  describe('/GET All document labels', () => {
    it('it should GET all the document labels', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/document labels')
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
  describe('/POST DocumentLabel store blank data submited', () => {
    it('It should send validation error for store document label', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/document label')
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
  describe('/POST DocumentLabel store', () => {
    it('It should store document label', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/document label')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          document labelData = res.body.data;
          createdID.push(document labelData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id document label', () => {
    it('it should GET the document label', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/document label/' + document labelData.id)
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
  describe('/PUT/:id document label', () => {
    it('it should not update the document label', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/document label/' + document labelData.id)
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
  describe('/PUT/:id document label', () => {
    it('it should PUT the document label', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/document label/' + document labelData.id)
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
  describe('/DELETE/:id document label', () => {
    it('it should DELETE the document label', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/document label/' + document labelData.id)
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
      db.DocumentLabel.findByIdAndRemove(id);
    });
    done();
  });
});
