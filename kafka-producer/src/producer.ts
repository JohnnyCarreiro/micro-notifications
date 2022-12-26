import { Kafka } from 'kafkajs'
import * as dotenv from 'dotenv'
import { randomUUID } from 'node:crypto'

async function bootstrap() {
  dotenv.config()

  const kafka = new Kafka({
    clientId: 'kafka-producer-1',
    brokers: ['measured-shad-5335-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_UPSTASH_USER ?? '',
      password: process.env.KAFKA_UPSTASH_KEY ?? '',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          recipientId: randomUUID(),
          content: 'New Content',
          category: 'Any-Category',
        }),
      },
    ],
  })

  await producer.disconnect()
}

bootstrap()

