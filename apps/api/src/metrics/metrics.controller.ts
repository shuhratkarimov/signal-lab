import { Controller, Get } from '@nestjs/common';
import { register } from './metrics';

@Controller()
export class MetricsController {
  @Get('/metrics')
  async getMetrics() {
    return register.metrics();
  }
}