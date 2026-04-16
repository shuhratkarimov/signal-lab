import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { logger } from '../logger/logger';
import { scenarioExecutedCounter } from '../metrics/metrics';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class ScenarioService {
  constructor(private prisma: PrismaService) {}

  async run(name: string) {
    Sentry.captureException(new Error('FORCE SENTRY TEST'));
    return Sentry.startSpan(
      {
        name: 'Scenario Execution',
        op: 'scenario.run',
        attributes: {
          'scenario.name': name,
        },
      },
      async (span) => {
        const status = 'started';

        logger.info(`Scenario [${name}] started`);
        scenarioExecutedCounter.inc({ type: name });

        Sentry.metrics.count(`scenario.${name}.started`, 1);

        if (name === 'latency') {
          logger.info(`Scenario [${name}] simulating 2s delay`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        await this.prisma.scenarioRun.create({
          data: { name, status },
        });

        if (name === 'error') {
          const err = new Error('Scenario failed intentionally');
          logger.error(`Scenario [${name}] failed: ${err.message}`);

          Sentry.captureException(err, {
            tags: {
              scenario: name,
            },
            extra: {
              status: status,
            },
          });

          span.setStatus({ code: 2, message: 'error' });
          throw err;
        }

        logger.info(`Scenario [${name}] completed successfully`);

        Sentry.metrics.count(`scenario.${name}.completed`, 1);

        span.setStatus({ code: 1, message: 'ok' });

        return {
          status: 'ok',
          name,
          message: `Scenario ${name} executed successfully`,
        };
      },
    );
  }

  async findAll() {
    return this.prisma.scenarioRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
  }
}
