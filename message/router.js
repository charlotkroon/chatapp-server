const express = require("express");
const db = require("../db");
const stream = require("../stream");

const { Router } = express;

const router = Router();

router.post("/message", (request, response) => {
  const { text } = request.body;

  db.messages.push(text);

  response.send(text);

  const action = {
    type: "NEW_MESSAGE",
    payload: text
  };

  stream.send(action);
});

module.exports = router;
