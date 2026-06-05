import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

connectToDb();

app.listen(3000,()=> {
    console.log("server is running on port number 3000.");
});