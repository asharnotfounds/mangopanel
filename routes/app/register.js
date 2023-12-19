const { adminRoute, loggedRoute, notLoggedRoute} = require(`../../functions/auth`);
const { generateUUID } = require(`../../functions/uniqueID`);
const { dbConnection } = require(`../../modules/database`)
const router = require('express').Router();
const bcrypt = require(`bcrypt`)


router.post(`/register`, notLoggedRoute, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const adb = await dbConnection();
        
        const usernameExists = await adb.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
        console.log(usernameExists[0])
        if (usernameExists[0].length > 0) {
            adb.end();
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        const emailExists = await adb.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

        if (emailExists[0].length > 0) {
            adb.end();
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        const uid = await generateUUID()
        console.log(uid);
        await adb.query('INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)', [uid, email, username, hashedPassword]);
        adb.end();

        res.status(200).json({ response: `User registered successfully`, status : "success" });
    } catch (error) {
        res.status(500).json({ response: `Error registering user\n${error}`, status : "failure" });
    }
});

router.get(`/register`, notLoggedRoute, async (req, res) => {

    try {
        res.render(`register`)
    } catch (error) {
        res.status(500).json({ response: `Error registering user`, status : "failure" });
    }
});

module.exports = router

