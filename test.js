const Express = require("express");
const app = Express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const spawn = require("child_process").spawn;
const process = spawn("python3", ["test.py"]);

app.set('port', 8000);

process.stdout.on("data", data => {
    console.log(data.toString());
    process.emit("dust", data.toString());
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")

})

io.on("connection", socket => {
    console.log("io connected!");
    process.on("dust", data => {
        socket.emit("data", data);
    });
})

server.listen(app.get('port'));
