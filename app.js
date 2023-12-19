const express = require('express');
      http = require('http');
      bodyParser = require('body-parser');
      cookieParser = require('cookie-parser');
      session = require('express-session');
      bcrypt = require('bcrypt');
      fs = require('fs');
      path = require('path');
      app = express();
      passport = require('passport');

const config = require(`./config.json`)
const server = http.createServer(app);
const SecretSiteKey = config.webserver.siteKey
const port = config.webserver.port

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SecretSiteKey
}));
  
  
  
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

  

[`database`, `passport`, `routeLoader`].forEach(module => {
    require(`./modules/${module}`)
    console.log(module);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});