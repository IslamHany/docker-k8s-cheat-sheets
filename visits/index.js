const express = require("express");
const redis = require("redis");
const process = require('process');


const app = express();
const client = redis.createClient({
    //redis-server is the service name
    //the host name is resolved by docker
    host: "redis-server"
});

client.set('visits', 0);

app.get("/", (req, res) => {
    //cause app crash
    process.exit(0);
    client.get("visits", (err, visits) => {
        res.send(`Number of visits is: ${visits}`);
        client.set('visits', +visits + 1);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081....");
});