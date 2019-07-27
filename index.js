const Express = require("express");
const app = Express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const spawn = require("child_process").spawn;
const process = spawn("python3", ["./dust_chk.py"]);

app.set('port', 8000);

process.stdout.on("data", data => {
    process.emit("dust", data);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")

})

io.on("connection", socket => {
    console.log("io connected!");
    process.on("dust", data => socket.emit("data", data.toString()));
})

server.listen(app.get('port'));
