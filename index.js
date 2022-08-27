const express = require('express');

const app = express();
const serverConfig = require('./src/config/server');
const routes = require('./src/routes');
const datastore = require('./src/common/datastore');

app.use(express.json());
routes(app);

datastore.connect((error) => {
  if (error) {
    console.log(`Unable to connect to Datastore. ${error}`);
    process.exit(1);
  } else {
    app.listen(serverConfig.server.port, () => {
      console.log(`Yousearch app listening on port ${serverConfig.server.port}!`);
    });
  }
});
