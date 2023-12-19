const router = require('express').Router();
const { adminRoute, loggedRoute, notLoggedRoute} = require(`../../../functions/auth`);
const { dbConnection } = require(`../../../modules/database`)



router.get('/admin/', loggedRoute, adminRoute, async (req, res) => {
    const connection = await dbConnection()
    const action = req.query.action
    const userID = req.query.userid
    if(action && userID) {
        switch (action) {
            case 'verify':
                await connection.query(`UPDATE users SET status = ? WHERE id = ?`, ['verified', userID])
                res.redirect(`/admin`)
                break;
        
            default:
                break;
        }
    } else {
        const [result] = await connection.query(`SELECT * FROM users`)
        res.render(`admin/index`, {
            users : result
        })
    }


})



module.exports = router
