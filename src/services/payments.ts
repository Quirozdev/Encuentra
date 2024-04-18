import { supabase } from "../supabase";
import { Database } from "../types/database.types";

export type PaymentDetail = { concept: string; price: number };

export type PaymentBreakdown = {
  [key: string]: PaymentDetail[];
};

export type Payment =
  & Pick<
    Database["public"]["Tables"]["pagos"]["Insert"],
    "tipo_pago" | "id_usuario" | "id_evento" | "total"
  >
  & {
    desglose_costos: PaymentBreakdown;
  };

export async function createPayment(payment: Payment) {
  const { data, error } = await supabase.from("pagos").insert({
    tipo_pago: payment.tipo_pago,
    id_usuario: payment.id_usuario,
    desglose_costos: payment.desglose_costos,
    total: payment.total,
    id_evento: payment.id_evento,
  });

  return data;
}
