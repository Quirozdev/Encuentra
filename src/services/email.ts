import { RESEND_API_KEY } from "@env";
import axios from "axios";
import { EventPayDetails } from "./events";
import { EventFields } from "../types/events.types";
import { formatStrDateToSpanish } from "../lib/dates";


interface EmailData {
  to: string;
  subject: string;
  htmlText: string;
}

export async function sendEmail(email: EmailData) {
  const data = await axios.post<{ id: string }>(
    "https://api.resend.com/emails",
    {
      from: "team@encuentraapp.me",
      to: [email.to],
      subject: email.subject,
      html: email.htmlText,
    },
    {
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

export function generateEventPaymentDetailsEmail(
  event: EventFields,
  payDetails: EventPayDetails
) {
  return `
    <h1>El evento <strong>${event.nombre}</strong> fue creado exitosamente.</h1>
    <h2>Detalles del evento:</h2>
    <p>Ubicación: ${event.nombre_municipio}, ${event.nombre_estado}, ${
    event.direccion
  }
    <p>Duración: ${event.duracion} horas</p>
    <p>Fecha: ${formatStrDateToSpanish(event.fecha)} a las ${event.hora}</p>
    <h2>Detalles de tarifa:</h2>
    ${payDetails.priceDetails
      .map((payDetail) => {
        return `<p>${payDetail.month}: $${payDetail.price}</p>`;
      })
      .join("")}
    <p>Total: <strong>$${payDetails.total}</strong></p>
  `;
}
