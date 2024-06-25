import mongoose from "mongoose";

export default class Database {
  #uri;

  constructor(uri) {
    this.#uri = uri;
  }

  connect = async () => {
    try {
      await mongoose.connect(this.#uri);
      console.log(`Connected to database at ${this.#uri}`);
    } catch (error) {
      console.log(`Error connecting to the database: `, error);
    }
  };

  close = async () => {
    await mongoose.disconnect();
  };
}
