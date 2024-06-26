import Server from "./server/Server.js";
import Config from "./config/Config.js";
import Database from "./database/Database.js";
import Router from "./routes/Router.js";
import AuthRouter from "./routes/Auth.routes.js";
import AdminRoutes from "./routes/Admin.routes.js";

Config.load();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const DB_URI = process.env.DB_URI;

const router = new Router();
const authRouter = new AuthRouter();
const adminRouter = new AdminRoutes();
router.addRouter(authRouter);
router.addRouter(adminRouter);

const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
database.connect();
