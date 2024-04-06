const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the plan level APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all plan levels
 * (3) Store plan level
 * (4) Get single plan level
 * (5) Update plan level
 * (6) Delete plan level
 */

describe('PlanLevel', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.PlanLevel.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, plan levelData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for plan level', (done) => {
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
  describe('/GET All plan levels', () => {
    it('it should GET all the plan levels', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/plan levels')
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
  describe('/POST PlanLevel store blank data submited', () => {
    it('It should send validation error for store plan level', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/plan level')
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
  describe('/POST PlanLevel store', () => {
    it('It should store plan level', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/plan level')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          plan levelData = res.body.data;
          createdID.push(plan levelData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id plan level', () => {
    it('it should GET the plan level', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/plan level/' + plan levelData.id)
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
  describe('/PUT/:id plan level', () => {
    it('it should not update the plan level', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/plan level/' + plan levelData.id)
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
  describe('/PUT/:id plan level', () => {
    it('it should PUT the plan level', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/plan level/' + plan levelData.id)
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
  describe('/DELETE/:id plan level', () => {
    it('it should DELETE the plan level', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/plan level/' + plan levelData.id)
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
      db.PlanLevel.findByIdAndRemove(id);
    });
    done();
  });
});
