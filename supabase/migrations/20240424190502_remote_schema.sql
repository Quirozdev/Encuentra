alter type "public"."tipo_notificacion" rename to "tipo_notificacion__old_version_to_be_dropped";

create type "public"."tipo_notificacion" as enum ('Me gusta', 'No me gusta', 'Asistiré', 'Evento Interés', 'Comentario', 'Evento_Bloqueado_Asistentes', 'Evento_Bloqueado_Propietario');

alter table "public"."notificaciones" alter column tipo type "public"."tipo_notificacion" using tipo::text::"public"."tipo_notificacion";

drop type "public"."tipo_notificacion__old_version_to_be_dropped";

alter table "public"."eventos" add column "bloqueado" boolean not null default false;

alter table "public"."pagos" add column "id_evento" bigint;

alter table "public"."pagos" disable row level security;

alter table "public"."usuarios" add column "expo_push_token" text default 'NULL'::text;

alter table "public"."pagos" add constraint "public_pagos_id_evento_fkey" FOREIGN KEY (id_evento) REFERENCES eventos(id) ON DELETE CASCADE not valid;

alter table "public"."pagos" validate constraint "public_pagos_id_evento_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.manejar_bloqueo_evento_notificacion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  -- early return para no hacer ningun insert si no se actualizo el campo de bloqueado o si se actualizo el campo de bloqueado a falso
  IF old.bloqueado = new.bloqueado OR new.bloqueado = FALSE THEN
    return new;
  END IF;

  -- Para notificar al creador del evento del bloqueo
  INSERT INTO
    notificaciones (
      texto,
      tipo,
      id_usuario_a_notificar,
      id_recurso_notificador,
      id_evento,
      url_imagen
    )
  VALUES
    (
      CONCAT(
        'Tu evento "',
        new.nombre,
        '" ha sido denunciado.'
      ),
      'Evento_Bloqueado_Propietario',
      new.id_usuario,
      new.id,
      new.id,
      new.portada
    );

  -- Para notificar a los usuarios que iban a asistir del bloqueo
  INSERT INTO
    notificaciones (
      texto,
      tipo,
      id_usuario_a_notificar,
      id_recurso_notificador,
      id_evento,
      url_imagen
    )
  SELECT
    CONCAT(
      'El evento "',
      new.nombre,
      '" ya no se encuentra disponible.'
    ),
    'Evento_Bloqueado_Asistentes',
    reacciones.id_usuario,
    new.id,
    new.id,
    new.portada
  FROM
    reacciones
  WHERE
    id_evento = new.id
    AND tipo_reaccion = 'Asistiré'
    -- para no notificar al creador del evento si ha reaccionado con asistir
    AND id_usuario != new.id_usuario;


  return new;
end;$function$
;

CREATE TRIGGER notificar_bloqueo_evento_a_propietario_y_asistentes AFTER UPDATE ON public.eventos FOR EACH ROW EXECUTE FUNCTION manejar_bloqueo_evento_notificacion();


