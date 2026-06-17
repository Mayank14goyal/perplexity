import "dotenv/config";
import app from "./src/app.js";
import connectToDb from "./src/config/db.js";
// import { testAi } from "./src/services/ai.services.js";
import { initsocket } from "./src/sockets/server.socket.js";
import http from "http"
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);

const httpServer = http.createServer(app);
initsocket(httpServer);

connectToDb();
// testAi()

httpServer.listen(3000,()=> {
    console.log("server is running on port number 3000.");
});