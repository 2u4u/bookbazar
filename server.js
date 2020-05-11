const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require("path");
const expressSession = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

// To get the data from a POST
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));

// Routes
const podcastRouter = require('./routes/api/podcast.router');
const authorRouter = require('./routes/api/author.router');
const bookRouter = require('./routes/api/book.router');
const userRouter = require('./routes/api/user.router');

// DB Configuration
require('./database/database');

app.use(expressSession({
  secret: require("./config/keys").session.secret,
  name: require("./config/keys").session.name,
  resave: false,
  saveUninitialized: true,
}));

// Use routes
app.use('/api/podcasts', podcastRouter);
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

// SSL connection settings
const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
}

// Production settings
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use('*', express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  http.createServer(app)
    .listen(port, () => {
      console.log('production server running at ' + port)
    })
} else {
  https.createServer(httpsOptions, app)
    .listen(port, () => {
      console.log('secured server running at ' + port)
    })
}
