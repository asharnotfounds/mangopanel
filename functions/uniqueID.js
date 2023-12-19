const { dbConnection } = require(`../modules/database`)
const uuid = require(`uuid`)

const generateUUID = async () => {
    let id = uuid.v4();
    if (await checkIfUUIDExists(id)) {
        return generateUUID();
    }
    return id;
};

async function checkIfUUIDExists(specialUUID) {
    try {
        const db = await dbConnection()
        const query = 'SELECT COUNT(*) AS count FROM users WHERE id = ?';
        const [results] = await db.query(query, [specialUUID]);
        const count = results[0].count;
        return count > 0;
    } catch (error) {
        throw error;
    }
}

module.exports.generateUUID = generateUUID