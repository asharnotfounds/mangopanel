const router = require('express').Router();
const { adminRoute, loggedRoute, notLoggedRoute} = require(`../../functions/auth`);



router.get('/home', loggedRoute, async (req, res) => {
    res.render(`home`)
})



module.exports = router
