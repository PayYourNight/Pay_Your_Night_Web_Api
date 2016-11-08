'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Equipe = mongoose.model('Equipe'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  equipe;

/**
 * Equipe routes tests
 */
describe('Equipe CRUD tests', function () {

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

    // Save a user to the test db and create new Equipe
    user.save(function () {
      equipe = {
        name: 'Equipe name'
      };

      done();
    });
  });

  it('should be able to save a Equipe if logged in', function (done) {
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

        // Save a new Equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle Equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Get a list of Equipes
            agent.get('/api/equipes')
              .end(function (equipesGetErr, equipesGetRes) {
                // Handle Equipes save error
                if (equipesGetErr) {
                  return done(equipesGetErr);
                }

                // Get Equipes list
                var equipes = equipesGetRes.body;

                // Set assertions
                (equipes[0].user._id).should.equal(userId);
                (equipes[0].name).should.match('Equipe name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Equipe if not logged in', function (done) {
    agent.post('/api/equipes')
      .send(equipe)
      .expect(403)
      .end(function (equipeSaveErr, equipeSaveRes) {
        // Call the assertion callback
        done(equipeSaveErr);
      });
  });

  it('should not be able to save an Equipe if no name is provided', function (done) {
    // Invalidate name field
    equipe.name = '';

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

        // Save a new Equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(400)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Set message assertion
            (equipeSaveRes.body.message).should.match('Please fill Equipe name');

            // Handle Equipe save error
            done(equipeSaveErr);
          });
      });
  });

  it('should be able to update an Equipe if signed in', function (done) {
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

        // Save a new Equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle Equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Update Equipe name
            equipe.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Equipe
            agent.put('/api/equipes/' + equipeSaveRes.body._id)
              .send(equipe)
              .expect(200)
              .end(function (equipeUpdateErr, equipeUpdateRes) {
                // Handle Equipe update error
                if (equipeUpdateErr) {
                  return done(equipeUpdateErr);
                }

                // Set assertions
                (equipeUpdateRes.body._id).should.equal(equipeSaveRes.body._id);
                (equipeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Equipes if not signed in', function (done) {
    // Create new Equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the equipe
    equipeObj.save(function () {
      // Request Equipes
      request(app).get('/api/equipes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Equipe if not signed in', function (done) {
    // Create new Equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the Equipe
    equipeObj.save(function () {
      request(app).get('/api/equipes/' + equipeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', equipe.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Equipe with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/equipes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Equipe is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Equipe which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Equipe
    request(app).get('/api/equipes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Equipe with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Equipe if signed in', function (done) {
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

        // Save a new Equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle Equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Delete an existing Equipe
            agent.delete('/api/equipes/' + equipeSaveRes.body._id)
              .send(equipe)
              .expect(200)
              .end(function (equipeDeleteErr, equipeDeleteRes) {
                // Handle equipe error error
                if (equipeDeleteErr) {
                  return done(equipeDeleteErr);
                }

                // Set assertions
                (equipeDeleteRes.body._id).should.equal(equipeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Equipe if not signed in', function (done) {
    // Set Equipe user
    equipe.user = user;

    // Create new Equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the Equipe
    equipeObj.save(function () {
      // Try deleting Equipe
      request(app).delete('/api/equipes/' + equipeObj._id)
        .expect(403)
        .end(function (equipeDeleteErr, equipeDeleteRes) {
          // Set message assertion
          (equipeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Equipe error error
          done(equipeDeleteErr);
        });

    });
  });

  it('should be able to get a single Equipe that has an orphaned user reference', function (done) {
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

          // Save a new Equipe
          agent.post('/api/equipes')
            .send(equipe)
            .expect(200)
            .end(function (equipeSaveErr, equipeSaveRes) {
              // Handle Equipe save error
              if (equipeSaveErr) {
                return done(equipeSaveErr);
              }

              // Set assertions on new Equipe
              (equipeSaveRes.body.name).should.equal(equipe.name);
              should.exist(equipeSaveRes.body.user);
              should.equal(equipeSaveRes.body.user._id, orphanId);

              // force the Equipe to have an orphaned user reference
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

                    // Get the Equipe
                    agent.get('/api/equipes/' + equipeSaveRes.body._id)
                      .expect(200)
                      .end(function (equipeInfoErr, equipeInfoRes) {
                        // Handle Equipe error
                        if (equipeInfoErr) {
                          return done(equipeInfoErr);
                        }

                        // Set assertions
                        (equipeInfoRes.body._id).should.equal(equipeSaveRes.body._id);
                        (equipeInfoRes.body.name).should.equal(equipe.name);
                        should.equal(equipeInfoRes.body.user, undefined);

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
      Equipe.remove().exec(done);
    });
  });
});
