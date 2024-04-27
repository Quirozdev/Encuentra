import { Database } from "../_shared/schema.ts";
import supabase from "../_shared/supabase.ts";

type NotificationRecord = Database["public"]["Tables"]["notificaciones"]["Row"];

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: NotificationRecord;
  schema: "public";
  old_record: null | NotificationRecord;
}

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();

  const { data } = await supabase
    .from("usuarios")
    .select("expo_push_token")
    .eq("id", payload.record.id_usuario_a_notificar)
    .single();

  if (!data || data.expo_push_token == null) {
    return new Response(
      JSON.stringify({
        error: "Expo Push Token not available",
      }),
      { headers: { "Content-Type": "application/json" }, status: 400 },
    );
  }

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("EXPO_ACCESS_TOKEN")}`,
    },
    body: JSON.stringify({
      to: data.expo_push_token,
      title: "Encuentra",
      sound: "default",
      body: payload.record.texto,
      data: {
        redirectUrl: `events/details/${payload.record.id_evento}`,
      },
    }),
  });

  const resJson = await res.json();

  return new Response(
    JSON.stringify(resJson),
    { headers: { "Content-Type": "application/json" } },
  );
});
