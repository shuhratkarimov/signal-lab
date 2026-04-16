# PRD 003: Cursor AI Layer
Конфигурация для автономной работы Cursor:
- **Rules:** `.cursor/rules/tech-stack.mdc` — запрет на fetch, использование только TanStack Query.
- **Commands:** `/setup` (билд), `/test-obs` (проверка логов).
- **Hooks:** Pre-commit проверка наличия Sentry DSN в окружении.