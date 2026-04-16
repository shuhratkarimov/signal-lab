import * as Sentry from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 0.1,
    profileSessionSampleRate: 0.1,
    profileLifecycle: "trace",
    enableLogs: true,
});