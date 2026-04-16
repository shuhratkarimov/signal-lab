"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Play, Loader2, ExternalLink, Activity } from "lucide-react";

const SCENARIOS = [
  { value: "success", label: "Успешный сценарий" },
  { value: "error", label: "Сценарий с ошибкой" },
  { value: "latency", label: "Сценарий с задержкой" },
];

export default function Home() {
  const queryClient = useQueryClient();

  const { setValue, handleSubmit } = useForm({
    defaultValues: { scenario: "" },
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["scenarios-history"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/scenarios`,
      );
      if (!res.ok) throw new Error("Не удалось загрузить историю");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/scenarios`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );
      if (!res.ok) throw new Error("Ошибка выполнения сценария");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Сценарий успешно выполнен");
      queryClient.invalidateQueries({ queryKey: ["scenarios-history"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: { scenario: string }) => {
    if (!data.scenario) {
      toast.error("Пожалуйста, выберите сценарий");
      return;
    }
    mutation.mutate(data.scenario);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 space-y-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Панель управления Signal Lab</CardTitle>
              <CardDescription>
                Запуск событий для наблюдаемости
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Выберите сценарий</label>
                <Select onValueChange={(val) => setValue("scenario", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сценарий..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SCENARIOS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Ссылки наблюдения
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="http://localhost:3001" target="_blank">
                      <ExternalLink className="w-3 h-3 mr-1" /> Grafana
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="http://localhost:3100" target="_blank">
                      <Activity className="w-3 h-3 mr-1" /> Loki
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 hover:bg-purple-50"
                    asChild
                  >
                    <a href={`${process.env.NEXT_PUBLIC_SENTRY_CLOUD_URL}`} target="_blank">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse" />
                      Sentry Cloud
                    </a>
                  </Button>
                </div>
              </div>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleSubmit(onSubmit)}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Play className="mr-2 h-4 w-4" />}
                  Запустить сценарий
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">История запусков</CardTitle>
            <CardDescription>Последние выполнения сценариев</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historyLoading ? (
                <p className="text-sm text-center py-4 text-muted-foreground">
                  Загрузка истории...
                </p>
              ) : history?.length > 0 ? (
                history.slice(0, 5).map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border rounded-md text-sm bg-white dark:bg-slate-900"
                  >
                    <span className="font-medium capitalize">{item.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === "error"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.status || "выполнено"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center py-4 text-muted-foreground">
                  История пока пуста
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}