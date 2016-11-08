'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  estabelecimento;

/**
 * Estabelecimento routes tests
 */
describe('Estabelecimento CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Estabelecimento
    user.save(function () {
      estabelecimento = {
        name: 'Estabelecimento name'
      };

      done();
    });
  });

  it('should be able to save a Estabelecimento if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Estabelecimento
        agent.post('/api/estabelecimentos')
          .send(estabelecimento)
          .expect(200)
          .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
            // Handle Estabelecimento save error
            if (estabelecimentoSaveErr) {
              return done(estabelecimentoSaveErr);
            }

            // Get a list of Estabelecimentos
            agent.get('/api/estabelecimentos')
              .end(function (estabelecimentosGetErr, estabelecimentosGetRes) {
                // Handle Estabelecimentos save error
                if (estabelecimentosGetErr) {
                  return done(estabelecimentosGetErr);
                }

                // Get Estabelecimentos list
                var estabelecimentos = estabelecimentosGetRes.body;

                // Set assertions
                (estabelecimentos[0].user._id).should.equal(userId);
                (estabelecimentos[0].name).should.match('Estabelecimento name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Estabelecimento if not logged in', function (done) {
    agent.post('/api/estabelecimentos')
      .send(estabelecimento)
      .expect(403)
      .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
        // Call the assertion callback
        done(estabelecimentoSaveErr);
      });
  });

  it('should not be able to save an Estabelecimento if no name is provided', function (done) {
    // Invalidate name field
    estabelecimento.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Estabelecimento
        agent.post('/api/estabelecimentos')
          .send(estabelecimento)
          .expect(400)
          .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
            // Set message assertion
            (estabelecimentoSaveRes.body.message).should.match('Please fill Estabelecimento name');

            // Handle Estabelecimento save error
            done(estabelecimentoSaveErr);
          });
      });
  });

  it('should be able to update an Estabelecimento if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Estabelecimento
        agent.post('/api/estabelecimentos')
          .send(estabelecimento)
          .expect(200)
          .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
            // Handle Estabelecimento save error
            if (estabelecimentoSaveErr) {
              return done(estabelecimentoSaveErr);
            }

            // Update Estabelecimento name
            estabelecimento.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Estabelecimento
            agent.put('/api/estabelecimentos/' + estabelecimentoSaveRes.body._id)
              .send(estabelecimento)
              .expect(200)
              .end(function (estabelecimentoUpdateErr, estabelecimentoUpdateRes) {
                // Handle Estabelecimento update error
                if (estabelecimentoUpdateErr) {
                  return done(estabelecimentoUpdateErr);
                }

                // Set assertions
                (estabelecimentoUpdateRes.body._id).should.equal(estabelecimentoSaveRes.body._id);
                (estabelecimentoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Estabelecimentos if not signed in', function (done) {
    // Create new Estabelecimento model instance
    var estabelecimentoObj = new Estabelecimento(estabelecimento);

    // Save the estabelecimento
    estabelecimentoObj.save(function () {
      // Request Estabelecimentos
      request(app).get('/api/estabelecimentos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Estabelecimento if not signed in', function (done) {
    // Create new Estabelecimento model instance
    var estabelecimentoObj = new Estabelecimento(estabelecimento);

    // Save the Estabelecimento
    estabelecimentoObj.save(function () {
      request(app).get('/api/estabelecimentos/' + estabelecimentoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', estabelecimento.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Estabelecimento with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/estabelecimentos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Estabelecimento is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Estabelecimento which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Estabelecimento
    request(app).get('/api/estabelecimentos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Estabelecimento with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Estabelecimento if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Estabelecimento
        agent.post('/api/estabelecimentos')
          .send(estabelecimento)
          .expect(200)
          .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
            // Handle Estabelecimento save error
            if (estabelecimentoSaveErr) {
              return done(estabelecimentoSaveErr);
            }

            // Delete an existing Estabelecimento
            agent.delete('/api/estabelecimentos/' + estabelecimentoSaveRes.body._id)
              .send(estabelecimento)
              .expect(200)
              .end(function (estabelecimentoDeleteErr, estabelecimentoDeleteRes) {
                // Handle estabelecimento error error
                if (estabelecimentoDeleteErr) {
                  return done(estabelecimentoDeleteErr);
                }

                // Set assertions
                (estabelecimentoDeleteRes.body._id).should.equal(estabelecimentoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Estabelecimento if not signed in', function (done) {
    // Set Estabelecimento user
    estabelecimento.user = user;

    // Create new Estabelecimento model instance
    var estabelecimentoObj = new Estabelecimento(estabelecimento);

    // Save the Estabelecimento
    estabelecimentoObj.save(function () {
      // Try deleting Estabelecimento
      request(app).delete('/api/estabelecimentos/' + estabelecimentoObj._id)
        .expect(403)
        .end(function (estabelecimentoDeleteErr, estabelecimentoDeleteRes) {
          // Set message assertion
          (estabelecimentoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Estabelecimento error error
          done(estabelecimentoDeleteErr);
        });

    });
  });

  it('should be able to get a single Estabelecimento that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Estabelecimento
          agent.post('/api/estabelecimentos')
            .send(estabelecimento)
            .expect(200)
            .end(function (estabelecimentoSaveErr, estabelecimentoSaveRes) {
              // Handle Estabelecimento save error
              if (estabelecimentoSaveErr) {
                return done(estabelecimentoSaveErr);
              }

              // Set assertions on new Estabelecimento
              (estabelecimentoSaveRes.body.name).should.equal(estabelecimento.name);
              should.exist(estabelecimentoSaveRes.body.user);
              should.equal(estabelecimentoSaveRes.body.user._id, orphanId);

              // force the Estabelecimento to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Estabelecimento
                    agent.get('/api/estabelecimentos/' + estabelecimentoSaveRes.body._id)
                      .expect(200)
                      .end(function (estabelecimentoInfoErr, estabelecimentoInfoRes) {
                        // Handle Estabelecimento error
                        if (estabelecimentoInfoErr) {
                          return done(estabelecimentoInfoErr);
                        }

                        // Set assertions
                        (estabelecimentoInfoRes.body._id).should.equal(estabelecimentoSaveRes.body._id);
                        (estabelecimentoInfoRes.body.name).should.equal(estabelecimento.name);
                        should.equal(estabelecimentoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Estabelecimento.remove().exec(done);
    });
  });
});
