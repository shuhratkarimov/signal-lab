# Signal Lab — Submission Checklist

### Репозиторий
- **URL:** [https://github.com/Signal-Labs/signal-lab]
- **Время работы:** 8 часов

# Команда запуска:
docker compose up -d --build

# Команда проверки:
docker ps && curl http://localhost:3000

# Команда остановки:
docker compose down

### Стек — Подтверждение
- Next.js (App Router)	        apps/web/app/page.tsx
- shadcn/ui	                    apps/web/components/ui/
- Tailwind CSS	                apps/web/tailwind.config.ts
- TanStack Query	            apps/web/app/providers.tsx & page.tsx
- React Hook Form	            apps/web/app/page.tsx
- NestJS	                    apps/api/src/
- PostgreSQL	                docker-compose.yml
- Prisma	                    libs/prisma/schema.prisma
- Sentry	                    apps/api/src/main.ts & UI block
- Prometheus	                apps/api/src/metrics/
- Grafana	                    http://localhost:3001
- Loki	                        http://localhost:3100

Предусловия:
- Docker & Docker Compose
- Node.js v18+ (для локальной разработки)

# Observability Verification
- Prometheus: http://localhost:3001 (Dashboard)
- Grafana: http://localhost:3001 (General Dash)
- Loki: http://localhost:3100
- Sentry: http://localhost:3000 (UI block)

#,      Skill,         Зачем подключён
---------------------------------------
1,      Prisma,        Поддержка схемы
2,      Tailwind,      CSS автокомплит
3,      NestJS,        Скелфолдинг модулей
4,      Next.js,       Оптимизация роутинга
5,      Docker,        Помощь с Dockerfile
6,      Sentry,        Отладка ошибок


# Orchestrator
-   Путь к skill: .cursor/skills/orchestrator.library
-   Путь к context file: prds/004_orchestrator.md
-   Сколько фаз: 3 (Plan, Execute, Verify)
-   Какие задачи для fast model: Unit-tests, CSS fixes, Refactoring.
-   Поддерживает resume: да

### AI Layer Verification
- **Orchestrator:** Работает через `.cursor/skills/orchestrator.library`. Делит задачи на фазы.
- **Context Economy:** Используется `history.slice(0, 5)` и компактные описания скиллов для экономии токенов.
- **Hooks:** Настроен `pre-commit` для проверки наличия Sentry DSN.