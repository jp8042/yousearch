const express = require('express');

const cron = require('node-cron');

const app = express();
const serverConfig = require('./src/config/server');
const routes = require('./src/routes');
const datastore = require('./src/common/datastore');
const videoService = require('./src/services/videoService');

app.use(express.json());
routes(app);

cron.schedule('*/20 * * * * *', () => {
  videoService.searchVideos('cricket');
});

const spinUpServer = async () => {
  try {
    await datastore.connect();
    app.listen(serverConfig.server.port, () => {
      console.log(`Yousearch app listening on port ${serverConfig.server.port}!`);
    });
  } catch (error) {
    console.log(`Unable to connect to Datastore. ${error}`);
    process.exit(1);
  }
};

spinUpServer();
