const MONGOOSE = require('mongoose');

class MongoDB {
  model;

  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return this.model.find();
    } catch (err) {
      console.log(err);
    }
  }

  getById(id) {
    try {
      return this.model.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  create(data) {
    try {
      return this.model.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  update(id, data) {
    try {
      return this.model.updateOne({ _id: id }, { $set: data });
    } catch (err) {
      console.log(err);
    }
  }

  delete(id) {
    try {
      return this.model.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  deleteAll() {
    try {
      return this.model.deleteMany();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MongoDB;