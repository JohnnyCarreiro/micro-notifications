import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ServerKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['measured-shad-5335-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'bWVhc3VyZWQtc2hhZC01MzM1JIYHS_CrhLeyo57EOo4D6hvyB7h0_sG5UM4_VzE',
          password: '0f168234f5d14a3b9f2412979d8fb585'
        },
        ssl: true
      }
    })
  }

  async onModuleDestroy(): Promise<void> {
    await this.close()
  }
}
