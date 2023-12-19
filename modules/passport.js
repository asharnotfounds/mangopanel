const { dbConnection } = require(`./database`)
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const connection = await dbConnection();
      const [result] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
      connection.end();
  
      if (result.length === 1) {
        const user = result[0];
        // Use bcrypt to compare the hashed password with the provided password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid username or password.' });
          }
        });
      } else {
        return done(null, false, { message: 'Invalid username or password.' });
      }
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const connection = await dbConnection();
    const [result] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    connection.end();

    if (result.length === 1) {
      return done(null, result[0]);
    } else {
      return done(new Error('User not found'));
    }
  } catch (error) {
    return done(error);
  }
});
  