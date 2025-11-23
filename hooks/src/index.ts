import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

// there should be a passoword logic as well so that is not triggered by anyone
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store the trigger in the database
  await client.$transaction(async (tx: any) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
