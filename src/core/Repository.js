const mongoose = require("mongoose");

const ENV = require("../constants/ENV");

const logger = require("./Logger");

class Repository {
  constructor() {
    this.connectionString = [
      "mongodb://",
      ENV.MONGODB_HOST,
      ":27017/",
      ENV.MONGODB_DATABASE,
      "?authSource=admin",
    ].join("");

    this.connect();
  }

  response = (data, error = null) =>
    Object({
      error,
      data,
    });

  connect = async () => {
    await mongoose
      .connect(this.connectionString)
      .then(() =>
        logger.info(
          `MongoDb Connected: ${ENV.MONGODB_HOST}/${ENV.MONGODB_DATABASE}`
        )
      )
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
  };

  disconnect = async () => {
    await mongoose.connection.close();
  };

  get = async (Schema, filter = {}) =>
    await Schema.find(filter)
      .then((data) => this.response(data))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  add = async (Schema, data) => {
    data = new Schema(data);
    try {
      let error = data.validateSync();
      if (error) {
        throw new Error(error);
      }
      return await data.save();
    } catch (error) {
      logger.error(`MongoDb Error: ${error.message}`);
      return this.response(null, "Malformed Request Body");
    }
  };

  modify = async (Schema, id, data) =>
    await Schema.findByIdAndUpdate(id, data, { new: true })
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  remove = async (Schema, id) =>
    await Schema.findByIdAndRemove(id)
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
}

module.exports = new Repository();
