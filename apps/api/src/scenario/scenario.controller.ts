import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import * as Sentry from '@sentry/nestjs';

@Controller('api/scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  async runScenario(@Body() body: { name: string }) {
    try {
      const result = await this.scenarioService.run(body.name);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Scenario failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllScenarios() {
    return this.scenarioService.findAll();
  }
}
