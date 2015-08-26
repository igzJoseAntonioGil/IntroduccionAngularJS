var
	  express = require("express"),
	  server = express(),
	  path = __dirname + process.argv[2],
	  port = process.argv[3];

console.log("Server path[" + path + "]...");
server.use(express.static(path));
server.listen(port);
console.log("Server listening on localhost:" + port + "...");
