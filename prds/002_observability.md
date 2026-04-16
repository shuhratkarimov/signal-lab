# PRD 002: Observability Demo
Описывает, как генерируются сигналы:
1. **Метрики:** Счётчик `scenario_execution_total` в Prometheus.
2. **Логи:** Структурированные JSON-логи отправляются в Loki через Winston/Pino.
3. **Ошибки:** Сценарий `system_error` триггерит исключение, которое перехватывает Sentry SDK.
4. **Dashboard:** Provisioned Grafana dashboard для визуализации.