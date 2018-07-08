'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Checkout = mongoose.model('Checkout'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  checkout;

/**
 * Checkout routes tests
 */
describe('Checkout CRUD tests', function () {

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

    // Save a user to the test db and create new Checkout
    user.save(function () {
      checkout = {
        name: 'Checkout name'
      };

      done();
    });
  });

  it('should be able to save a Checkout if logged in', function (done) {
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

        // Save a new Checkout
        agent.post('/api/checkouts')
          .send(checkout)
          .expect(200)
          .end(function (checkoutSaveErr, checkoutSaveRes) {
            // Handle Checkout save error
            if (checkoutSaveErr) {
              return done(checkoutSaveErr);
            }

            // Get a list of Checkouts
            agent.get('/api/checkouts')
              .end(function (checkoutsGetErr, checkoutsGetRes) {
                // Handle Checkouts save error
                if (checkoutsGetErr) {
                  return done(checkoutsGetErr);
                }

                // Get Checkouts list
                var checkouts = checkoutsGetRes.body;

                // Set assertions
                (checkouts[0].user._id).should.equal(userId);
                (checkouts[0].name).should.match('Checkout name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Checkout if not logged in', function (done) {
    agent.post('/api/checkouts')
      .send(checkout)
      .expect(403)
      .end(function (checkoutSaveErr, checkoutSaveRes) {
        // Call the assertion callback
        done(checkoutSaveErr);
      });
  });

  it('should not be able to save an Checkout if no name is provided', function (done) {
    // Invalidate name field
    checkout.name = '';

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

        // Save a new Checkout
        agent.post('/api/checkouts')
          .send(checkout)
          .expect(400)
          .end(function (checkoutSaveErr, checkoutSaveRes) {
            // Set message assertion
            (checkoutSaveRes.body.message).should.match('Please fill Checkout name');

            // Handle Checkout save error
            done(checkoutSaveErr);
          });
      });
  });

  it('should be able to update an Checkout if signed in', function (done) {
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

        // Save a new Checkout
        agent.post('/api/checkouts')
          .send(checkout)
          .expect(200)
          .end(function (checkoutSaveErr, checkoutSaveRes) {
            // Handle Checkout save error
            if (checkoutSaveErr) {
              return done(checkoutSaveErr);
            }

            // Update Checkout name
            checkout.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Checkout
            agent.put('/api/checkouts/' + checkoutSaveRes.body._id)
              .send(checkout)
              .expect(200)
              .end(function (checkoutUpdateErr, checkoutUpdateRes) {
                // Handle Checkout update error
                if (checkoutUpdateErr) {
                  return done(checkoutUpdateErr);
                }

                // Set assertions
                (checkoutUpdateRes.body._id).should.equal(checkoutSaveRes.body._id);
                (checkoutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Checkouts if not signed in', function (done) {
    // Create new Checkout model instance
    var checkoutObj = new Checkout(checkout);

    // Save the checkout
    checkoutObj.save(function () {
      // Request Checkouts
      request(app).get('/api/checkouts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Checkout if not signed in', function (done) {
    // Create new Checkout model instance
    var checkoutObj = new Checkout(checkout);

    // Save the Checkout
    checkoutObj.save(function () {
      request(app).get('/api/checkouts/' + checkoutObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', checkout.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Checkout with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/checkouts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Checkout is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Checkout which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Checkout
    request(app).get('/api/checkouts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Checkout with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Checkout if signed in', function (done) {
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

        // Save a new Checkout
        agent.post('/api/checkouts')
          .send(checkout)
          .expect(200)
          .end(function (checkoutSaveErr, checkoutSaveRes) {
            // Handle Checkout save error
            if (checkoutSaveErr) {
              return done(checkoutSaveErr);
            }

            // Delete an existing Checkout
            agent.delete('/api/checkouts/' + checkoutSaveRes.body._id)
              .send(checkout)
              .expect(200)
              .end(function (checkoutDeleteErr, checkoutDeleteRes) {
                // Handle checkout error error
                if (checkoutDeleteErr) {
                  return done(checkoutDeleteErr);
                }

                // Set assertions
                (checkoutDeleteRes.body._id).should.equal(checkoutSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Checkout if not signed in', function (done) {
    // Set Checkout user
    checkout.user = user;

    // Create new Checkout model instance
    var checkoutObj = new Checkout(checkout);

    // Save the Checkout
    checkoutObj.save(function () {
      // Try deleting Checkout
      request(app).delete('/api/checkouts/' + checkoutObj._id)
        .expect(403)
        .end(function (checkoutDeleteErr, checkoutDeleteRes) {
          // Set message assertion
          (checkoutDeleteRes.body.message).should.match('User is not authorized');

          // Handle Checkout error error
          done(checkoutDeleteErr);
        });

    });
  });

  it('should be able to get a single Checkout that has an orphaned user reference', function (done) {
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

          // Save a new Checkout
          agent.post('/api/checkouts')
            .send(checkout)
            .expect(200)
            .end(function (checkoutSaveErr, checkoutSaveRes) {
              // Handle Checkout save error
              if (checkoutSaveErr) {
                return done(checkoutSaveErr);
              }

              // Set assertions on new Checkout
              (checkoutSaveRes.body.name).should.equal(checkout.name);
              should.exist(checkoutSaveRes.body.user);
              should.equal(checkoutSaveRes.body.user._id, orphanId);

              // force the Checkout to have an orphaned user reference
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

                    // Get the Checkout
                    agent.get('/api/checkouts/' + checkoutSaveRes.body._id)
                      .expect(200)
                      .end(function (checkoutInfoErr, checkoutInfoRes) {
                        // Handle Checkout error
                        if (checkoutInfoErr) {
                          return done(checkoutInfoErr);
                        }

                        // Set assertions
                        (checkoutInfoRes.body._id).should.equal(checkoutSaveRes.body._id);
                        (checkoutInfoRes.body.name).should.equal(checkout.name);
                        should.equal(checkoutInfoRes.body.user, undefined);

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
      Checkout.remove().exec(done);
    });
  });
});
