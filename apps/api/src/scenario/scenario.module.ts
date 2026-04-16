import { Module } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { ScenarioController } from './scenario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScenarioController],
  providers: [ScenarioService],
})
export class ScenarioModule {}
