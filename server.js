"use strict";

const config = require("./server/config");
const app = require("./server/app/index");

let port = process.env.PORT || config.development.port;

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
console.log(port);
app.listen(port, () => console.log(`Magic happening at http://localhost:${port}`));