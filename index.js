const express = require('express');

const app = express();
const serverConfig = require('./src/config/server');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(serverConfig.server.port, () => {
  console.log(`Yousearch app listening on port ${serverConfig.server.port}!`);
});
