const router = require('express').Router();
const { adminRoute, loggedRoute, notLoggedRoute} = require(`../../functions/auth`);



router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
		return res.redirect(`/home`)
	} 
    res.redirect(`/login`)
})



module.exports = router
