const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/gals_app_test';
const server = require(__dirname + '/../server');
const Gallery = require(__dirname + '/../models/gallery');
const User = require(__dirname + '/../models/user');

describe('the gals api', () => {

  var testToken = null;
  var fakeUser;
  before((done) => {
    User.create({ email: 'a@b.com', password: 'cowabunga123' }, (err, data) => {
      if (err) throw err;
      fakeUser = data;
      this.token = data.generateToken();
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our gals', (done) => {
    chai.request('localhost:3000')
      .get('/api/gals')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a gallery with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/gals')
      .send({name: 'test-gallery'})
      .set('token', this.token)
      .set('user', fakeUser)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test-gallery');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a gallery already in db', () => {
    beforeEach((done) => {
      Gallery.create({name: 'test-gallery'}, (err, data) => {
        this.testGallery = data;
        done();
      });
    });

    it('should be able to update a gallery', (done) => {
      chai.request('localhost:3000')
        .put('/api/gals/' + this.testGallery._id)
        .set('token', this.token)
        .send({name: 'newname'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Success');
          done();
        });
    });

    it('should be able to delete a gallery', (done) => {
      chai.request('localhost:3000')
        .delete('/api/gals/' + this.testGallery._id)
        .set('token', this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Success');
          done();
        });
    });
  });
});
