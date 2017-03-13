const app = require("./server/config/app"),
    config = require("./server/config/config");

const port = process.env.PORT || config.development.port;
console.log(port);
app.listen(port, () => {
    console.log(`Magic happening at http://localhost:${port}`);
});