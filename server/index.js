const http = require("http");
const app = require("./src/config/express.config");
require("dotenv").config();

const server = http.createServer(app);

const PORT = process.env.PORT || 4567;

server.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is up at ${PORT}`);
    console.log(`CTRL+C for shutting down server`);
  }
});
