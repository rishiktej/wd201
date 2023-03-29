const http = require("http");
const fs = require("fs");
// const path = require("path");
// const { argv } = require("process");

// const portIndex = argv.indexOf("--port");
// const port = portIndex !== -1 ? Number(argv[portIndex + 1]) : 3000;
const arg=require("minimist")(process.argv.slice(2))

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;

  if (method === "GET" && reqUrl === "/registration") {
    const filePath = path.join(__dirname, "registration.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading file");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (method === "GET" && reqUrl === "/projects") {
    const filePath = path.join(__dirname, "project.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading file");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (method === "GET" && reqUrl === "/") {
    const filePath = path.join(__dirname, "home.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading file");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});
server.listen(arg);

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
});
