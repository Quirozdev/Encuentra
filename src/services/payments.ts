import { supabase } from "../supabase";
import { Database } from "../types/database.types";

export type PaymentDetail = { concept: string; price: number };

type Payment =
  & Pick<
    Database["public"]["Tables"]["pagos"]["Insert"],
    "tipo_pago" | "id_usuario" | "total"
  >
  & {
    desglose_costos: PaymentDetail[];
  };

export async function createPayment(payment: Payment) {
  const { data, error } = await supabase.from("pagos").insert({
    tipo_pago: payment.tipo_pago,
    id_usuario: payment.id_usuario,
    desglose_costos: payment.desglose_costos,
    total: payment.total,
  });

  return data;
}
