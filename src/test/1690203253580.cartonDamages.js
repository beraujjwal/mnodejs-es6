const { chai, server, should } = require('./testConfig');
const db = require('../system/core/model');

/**
 * Test cases to test all the carton damage APIs
 * Covered Routes:
 * (1) Login
 * (2) Get all carton damages
 * (3) Store carton damage
 * (4) Get single carton damage
 * (5) Update carton damage
 * (6) Delete carton damage
 */

describe('CartonDamage', () => {
  //Before each test we empty the database
  /*before((done) => {
    db.CartonDamage.deleteMany({}, (err) => {
      done();
    });
  });*/

  // Prepare data for testing
  const userTestData = {
    password: '123456',
    username: 'anna.jones@mail.com',
  };
  var loginResponse, carton damageData;

  // Prepare data for testing
  const testData = {
    name: 'Lorem ipsum dolor sit amet',
  };
  const createdID = [];

  /*
   * Test the /POST route
   */
  describe('/POST Login', () => {
    it('it should do user Login for carton damage', (done) => {
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
  describe('/GET All carton damages', () => {
    it('it should GET all the carton damages', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carton damages')
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
  describe('/POST CartonDamage store blank data submited', () => {
    it('It should send validation error for store carton damage', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carton damage')
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
  describe('/POST CartonDamage store', () => {
    it('It should store carton damage', (done) => {
      chai
        .request(server)
        .post('/api/v1.0/carton damage')
        .send(testData)
        .set('x-access-token', loginResponse.accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('error').eql(false);
          carton damageData = res.body.data;
          createdID.push(carton damageData.id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id carton damage', () => {
    it('it should GET the carton damage', (done) => {
      chai
        .request(server)
        .get('/api/v1.0/carton damage/' + carton damageData.id)
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
  describe('/PUT/:id carton damage', () => {
    it('it should not update the carton damage', (done) => {
      chai
        .request(server)
        .put('/api/v1.0/carton damage/' + carton damageData.id)
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
  describe('/PUT/:id carton damage', () => {
    it('it should PUT the carton damage', (done) => {
      let updatedTestData = { ...testData, status: true };
      chai
        .request(server)
        .put('/api/v1.0/carton damage/' + carton damageData.id)
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
  describe('/DELETE/:id carton damage', () => {
    it('it should DELETE the carton damage', (done) => {
      chai
        .request(server)
        .delete('/api/v1.0/carton damage/' + carton damageData.id)
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
      db.CartonDamage.findByIdAndRemove(id);
    });
    done();
  });
});
