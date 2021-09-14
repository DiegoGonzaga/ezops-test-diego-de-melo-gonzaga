const server = require("./server");

server.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
