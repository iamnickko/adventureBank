import Server from "./server/Server.js";
import Config from "./config/Config.js";

Config.load();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = new Server(PORT, HOST);

server.start();
