const express = require("express");
const amqp = require("amqplib");

const app = express();

const port = 2000;

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
    const channel = await connection.createChannel();
    const taskQueue = "tasks";

    await channel.assertQueue(taskQueue);

    await channel.consume(taskQueue, (msg) => {
      try {
        const taskData = JSON.parse(msg.content.toString());
        const email = taskData.data;
        const message = `Письмо отправлено на ${email}`;
        const task = {
          data: message,
        };

        sendResult(channel, JSON.stringify(task));

        channel.ack(msg);
      } catch (err) {
        console.error("Ошибка при обработке задачи:", err);
      }
    });
  } catch (err) {
    console.error("Ошибка при подключении RabbitMQ:", err);
  }
};

function sendResult(channel, result) {
  const resultQueue = "result";
  channel.assertQueue(resultQueue, { durable: true });
  channel.sendToQueue(resultQueue, Buffer.from(result));
}

connect();
app.listen(port, async () => {
  console.log(`Сервер М2 запущен на порту ${port}`);
});
