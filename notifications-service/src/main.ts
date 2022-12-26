import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions } from '@nestjs/microservices'
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const kafkaConsulmerService = app.get(KafkaConsumerService)
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsulmerService
  })

  await app.startAllMicroservices()

  await app.listen(3000)
}
bootstrap()
