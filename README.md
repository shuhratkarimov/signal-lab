Этот проект представляет собой инженерную песочницу для демонстрации навыков построения современной инфраструктуры мониторинга и создания автономного AI-слоя для разработки в Cursor.

# Быстрый старт

Проект полностью контейнеризирован. Все сервисы поднимаются одной командой.

Предусловия:
- Docker & Docker Compose
- Node.js v18+ (для локальной разработки)

# Запуск:
docker compose up -d --build

# Проверка:
UI: http://localhost:3000
Grafana: http://localhost:3001 (Login: admin, Pass: admin)
Prometheus: http://localhost:9090
Loki (API): http://localhost:3100/ready

# Остановка:
docker compose down

# Технологический стек
Frontend    -   Next.js (App Router), shadcn/ui, Tailwind CSS, TanStack Query, React Hook Form
Backend     -   NestJS
Data        -   PostgreSQL, Prisma ORM
Observability   -   Sentry Cloud, Prometheus, Grafana, Loki
Infra   -    Docker Compose

# Cursor AI Layer
Репозиторий спроектирован как среда, в которой Cursor может работать автономно.
1. Custom Skills (.cursor/skills/)
-   Orchestrator Skill: Декомпозирует PRD на атомарные задачи, делегируя выполнение малым моделям. 
-   Observability Skill: Автоматически настраивает эндпоинты мониторинга и проверяет консистентность логов. 
-   Prisma-Schema Skill: Помогает AI правильно расширять базу данных без нарушения связей.

2. Guardrails & Rules (.cursor/rules/)
-   tech-stack.mdc: Строгое ограничение на использование TanStack Query вместо стандартного fetch.
-   observability-conventions.mdc: Правила именования метрик Prometheus и уровней логирования.

3. Workflow Commands (.cursor/commands/)
-   /add-scenario: Добавление сценария.
-   /fix-observability: Запуск сценариев для проверки связки Loki + Grafana.
-   /deploy-infra: Анализ последних ошибок из логов контейнера.

# Инструкция по проверке (Demo)

1. Откройте Signal Lab UI (localhost:3000).
2. В левой части (Control Panel) выберите сценарий "Error Scenario" и нажмите Run.
3. Проверьте результат:
-   UI: В правой части в "Run History" появится запись со статусом error.
-   Sentry: Нажмите кнопку "Sentry Cloud" в блоке Obs Links — вы увидите зафиксированный Exception с полным Stack Trace.
-   Loki: Нажмите кнопку "Loki" или перейдите в Grafana Explore, чтобы увидеть структурированный лог ошибки.
-   Prometheus: В Grafana Dashboard метрика scenario_execution_total увеличится на 1.

# Состав пакета PRD
Все проектные решения описаны в папке prds/:
-   001_platform-foundation.md: Архитектура Next/Nest/Docker.
-   002_observability.md: Сценарии генерации сигналов.
-   003_ai-layer.md: Конфигурация AI-архитектуры.
-   004_orchestrator.md: Логика работы Multi-agent Orchestrator.