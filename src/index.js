const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.write("Hello World!");
    res.end();
  }
});

server.listen(3001, () => {
  console.log("Server on http://localhost:3001");
});
