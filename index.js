const express = require("express");
const Sse = require("json-sse"); //stream maker

const app = express();

const port = 4000;

const db = {};

db.messages = [];

const parser = express.json();
app.use(parser);

const stream = new Sse();

app.get("/stream", (request, response) => {
  stream.init(request, response); //this is how you connect someone to the stream
});

app.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);
  stream.send(text); //send data over the stream here. Stream is always loading btw.
  console.log("db text:", db);
});

app.listen(port, () => console.log(`Listening on :${port}`));
