// express
const express = require('express')

// authentication middleware
const passport = require('passport')

// mongoose model for walks
const Walk = require('../models/walk')

// why not go on and use this error
const customErrors = require('../../lib/custom_errors')

// non-existant document
const handle404 = customErrors.handle404

// sends 401 when a user tries to modify something they don't own
const requireOwnership = customErrors.requireOwnership

// removes blanks
const removeBlanks = require('../../lib/remove_blank_fields')

// token is required, ie a user must be logged in for this
const requireToken = passport.authenticate('bearer', { session: false })

// initiate router
const router = express.Router()

// CRUD ACTIONS HERE

// Index
router.get('/walks', requireToken, (req, res, next) => {
  Walk.find()
    .then(walks => {
      // walks will be an array of all the walks a user has begun or completed
      // converting to POJO using .map
      return walks.map(walk =>
        walk.toObject())
    })
    // response of 200 then JSON of the walks
    .then(walks => res.status(200).json({
      walks: walks
    }))
    .catch(next)
})

// Show (one walk) when one is clicked from the index
router.get('/walks/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the ':id' in the route
  Walk.findById(req.params.id)
    .then(handle404)
    // if success, res with 200 and walk json
    .then(walk => res.status(200).json({
      walk: walk.toObject()
    }))
    .catch(next)
})

// Create (post)
router.post('/walks', requireToken, (req, res, next) => {
  console.log('req', req)
  console.log('res', res)
  // set owner of new walk to be the logged in user
  req.body.walk.owner = req.user.id

  Walk.create(req.body.walk)
    // respond to success with status 201 and json of new walk
    .then(walk => {
      res.status(201).json({ walk:
      walk.toObject() })
    })
    // if err pass to handler
    .catch(next)
})

// update (patch) the amount a user has walked
router.patch('/walks/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.walk.owner

  Walk.findById(req.params.id)
    .then(handle404)
    .then(walk => {
      requireOwnership(req, walk)
      return walk.updateOne(req.body.walk)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// deleting a user's walk
// could later consider deleting a section of the walk, but that seems unnecessary
router.delete('/walks/:id', requireToken, (req, res, next) => {
  Walk.findById(req.params.id)
    .then(handle404)
    .then(walk => {
      requireOwnership(req, walk)
      walk.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
