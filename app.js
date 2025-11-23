const http = require("http");
const server = http.createServer((req, res) => {
  res.end("DevOps Elevate Labs CI/CD Success");
});
server.listen(3000, () => console.log("Server running on 3000"));
