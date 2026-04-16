#!/bin/bash
if ! grep -q "Sentry.init" apps/api/src/main.ts; then
  echo "ERROR: Sentry not connected!"
  exit 1
fi
echo "All systems are go."