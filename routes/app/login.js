const router = require('express').Router();
const passport = require('passport');
const { adminRoute, loggedRoute, notLoggedRoute} = require(`../../functions/auth`);

// Define routes using the router
router.post('/login', notLoggedRoute, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: false,
}))

router.get('/login', notLoggedRoute, async (req, res) => {
  res.render(`login`)
})



module.exports = router
