const express = require("express");
const amqp = require("amqplib");

const app = express();
const port = 1000;

app.use(express.json());

let channel;

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
    channel = await connection.createChannel();

    const taskQueue = "tasks";
    await channel.assertQueue(taskQueue, { durable: true });

    const resultQueue = "result";
    await channel.assertQueue(resultQueue);

    channel.consume(
      resultQueue,
      (msg) => {
        const result = JSON.parse(msg.content.toString());
        const data = result.data;
        console.log(
          "Возвращаем результат выполнения задания из RabbitMQ:",
          data
        );
      },
      { noAck: true }
    );
  } catch (err) {
    console.error("Ошибки RabbitMQ", err);
  }
};

connect();

app.listen(port, async () => {
  console.log(`Сервер М1 запущен на порту ${port}`);
});

app.post("/email", (req, res) => {
  if (!channel) {
    res.status(500).send("Ошибка сервера");
    return;
  }

  const { email } = req.body;
  const task = {
    data: email,
  };

  channel.sendToQueue("tasks", Buffer.from(JSON.stringify(task)));

  res.send("Запрос принят");
});
