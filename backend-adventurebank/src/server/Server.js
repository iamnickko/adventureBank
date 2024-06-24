import express from "express";

export default class Server {
  #app;
  #port;
  #host;
  #server;
  #router;
  constructor(port, host) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
  }

  getApp = () => {
    return this.#app;
  };

  start = () => {
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(
        `Server is running on ${this.#server.address().address}:${
          this.#server.address().port
        }`
      );
    });
  };

  close = () => {
    this.#server?.close();
  };
}
