import { Counter, Registry } from 'prom-client';

export const register = new Registry();

export const scenarioExecutedCounter = new Counter({
  name: 'scenario_executed_total',
  help: 'Total executed scenarios',
  labelNames: ['type'],
});

register.registerMetric(scenarioExecutedCounter);