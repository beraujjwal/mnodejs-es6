const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the conflict paragraph APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all conflict paragraphs
 * (3) Store conflict paragraph
 * (4) Get single conflict paragraph
 * (5) Update conflict paragraph
 * (6) Delete conflict paragraph
 */

describe('ConflictParagraph', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.ConflictParagraph.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, conflict paragraphData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for conflict paragraph', (done) => {
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
  describe('/GET All conflict paragraphs', () => {
    it('it should GET all the conflict paragraphs', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict paragraphs')
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
  describe('/POST ConflictParagraph store blank data submited', () => {
    it('It should send validation error for store conflict paragraph', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict paragraph')
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
  describe('/POST ConflictParagraph store', () => {
    it('It should store conflict paragraph', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/conflict paragraph')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          conflict paragraphData = res.body.data;
          createdID.push(conflict paragraphData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id conflict paragraph', () => {
    it('it should GET the conflict paragraph', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/conflict paragraph/' + conflict paragraphData.id)
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
  describe('/PUT/:id conflict paragraph', () => {
    it('it should not update the conflict paragraph', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/conflict paragraph/' + conflict paragraphData.id)
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
  describe('/PUT/:id conflict paragraph', () => {
    it('it should PUT the conflict paragraph', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/conflict paragraph/' + conflict paragraphData.id)
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
  describe('/DELETE/:id conflict paragraph', () => {
    it('it should DELETE the conflict paragraph', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/conflict paragraph/' + conflict paragraphData.id)
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
      db.ConflictParagraph.findByIdAndRemove(id);
    });
    done();
  });
});
