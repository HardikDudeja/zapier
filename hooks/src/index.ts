import express from "express";

const app = express();

// there should be a passoword logic as well so that is not triggered by anyone
app.post("/hooks/catch/:userId/:zapId", (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;

  // store the trigger in the database

  // pust it to the queue kafka or redis or any other queue
});
