import AdminRoutes from "./routes/Admin.routes.js";
import AuthRouter from "./routes/Auth.routes.js";
import AdventureRouter from "./routes/Adventure.routes.js";
import Config from "./config/Config.js";
import Database from "./database/Database.js";
import Router from "./routes/Router.js";
import Server from "./server/Server.js";

Config.load();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const DB_URI = process.env.DB_URI;

const router = new Router();
const adminRouter = new AdminRoutes();
const authRouter = new AuthRouter();
const adventureRouter = new AdventureRouter();
router.addRouter(adminRouter);
router.addRouter(authRouter);
router.addRouter(adventureRouter);

const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
database.connect();
