const http = require("http");
const router=require("./route")
const server = http.createServer(router);

server.listen(2000, () => {
  console.log("server is listening---->");
});
