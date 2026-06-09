import { testAi } from "./src/services/ai.services.js";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

connectToDb();
testAi()

app.listen(3000,()=> {
    console.log("server is running on port number 3000.");
});