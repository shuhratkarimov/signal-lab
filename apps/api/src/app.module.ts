import { Module } from '@nestjs/common';
import { ScenarioModule } from './scenario/scenario.module';
import { MetricsModule } from './metrics/metrics.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  SentryModule.forRoot(),
    ScenarioModule, MetricsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
