#!/bin/bash
if grep -q "ScenarioService" apps/api/src/scenario/scenario.service.ts; then
  echo "Observability check passed"
else
  echo "Error: Scenario added without observability service!"
  exit 1
fi