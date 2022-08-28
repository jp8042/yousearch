const mongoose = require('mongoose');

const { mongo } = require('../config/mongo');

const connect = async () => {
  // const uri = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`;
  const options = {
    useNewUrlParser: true,
    autoIndex: false,
  };
  try {
    await mongoose.connect(mongo.uri, options);
    console.log(`Mongoose connection State ${mongoose.STATES[mongoose.connection.readyState]}`);
  } catch (error) {
    console.log('Unable to connect to Datastore. ', error);
    throw error;
  }
};

mongoose.connection.on('connected', () => {
  console.log('Connection to MongoDB server is open');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection to MongoDB server is disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection to MongoDB server is reconnected');
});

mongoose.connection.on('error', (error) => {
  console.log(`Error occured on MongoDB Connection. ${error}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Closing MongoDB connection due to application termination');
    process.exit(0);
  });
});

module.exports = {
  connect,
};
