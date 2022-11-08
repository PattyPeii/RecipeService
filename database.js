const mysql = require("mysql");

var config = {
  user: 'admin',
  database: 'cooknet',
  password: 'SW_arch1234',
};

// Later on when running from Google Cloud, env variables will be passed in container cloud connection config
if (process.env.NODE_ENV === "production") {
  console.log("Running from cloud. Connecting to DB through GCP socket.");
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// When running from localhost, get the config from .env
else {
  console.log("Running from localhost. Connecting to DB directly.");
  config.host = '34.143.196.84';
}

let connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as thread id: " + connection.threadId);
});

module.exports = connection;
