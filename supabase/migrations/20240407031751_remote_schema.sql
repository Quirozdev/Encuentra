create table "public"."customers" (
    "id" uuid not null,
    "stripe_customer_id" text not null
);


CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."customers" add constraint "public_customers_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "public_customers_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_filtered_events_with_reactions_and_comments(user_id uuid, filter_reactions text[] DEFAULT NULL::text[], filter_upcoming boolean DEFAULT false, filter_finished boolean DEFAULT false, include_comments boolean DEFAULT true)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    events_json JSON := '[]'; -- Initialize as an empty array
BEGIN
    SELECT json_agg(
            json_build_object(
                'date', fecha,
                'events', events
            )
        ) INTO events_json
    FROM (

      SELECT 
    fecha,
    json_agg(
        json_build_object(
            'id', id,
            'nombre', nombre,
            'descripcion', descripcion,
            'fecha', fecha,
            'hora', hora,
            'direccion', direccion,
            'portada', portada,
            'nombre_estado', nombre_estado,
            'nombre_municipio', nombre_municipio,
            'latitud_ubicacion', latitud_ubicacion,
            'longitud_ubicacion', longitud_ubicacion,
            'estatus', estatus,
            'duracion', duracion,
            'costo', costo,
            'categorias', categorias,
            'reaccion_usuario', reaccion_usuario,
            'comentarios', comentarios
        )
    ) AS events
FROM (
    -- Events with comments
    SELECT 
        e.id,
        e.nombre,
        e.descripcion,
        e.fecha,
        e.hora,
        e.direccion,
        e.portada,
        e.nombre_estado,
        e.nombre_municipio,
        e.latitud_ubicacion,
        e.longitud_ubicacion,
        e.estatus,
        e.duracion,
        e.costo,
        (
            SELECT json_agg(
                json_build_object(
                    'id', c.id,
                    'nombre', c.nombre,
                    'emoji', c.emoji,
                    'color', c.color
                )
            )
            FROM categorias c
            JOIN categorias_eventos ce ON c.id = ce.id_categoria
            WHERE ce.id_evento = e.id
        ) AS categorias,
        NULL AS reaccion_usuario,
        (
            SELECT json_agg(
                json_build_object(
                    'id', c.id,
                    'id_usuario', c.id_usuario,
                    'comentario', c.comentario
                )
            )
            FROM comentarios c
            WHERE c.id_evento = e.id AND c.id_usuario = user_id
        ) AS comentarios
    FROM eventos e
    WHERE 
            -- Filter by upcoming events
            (NOT filter_upcoming OR e.fecha >= CURRENT_DATE)
            AND
            -- Filter by finished events
            (NOT filter_finished OR e.fecha < CURRENT_DATE)
            AND
   (
                    include_comments AND  EXISTS (
                        SELECT 1 
                        FROM comentarios c 
                        WHERE c.id_evento = e.id AND c.id_usuario = user_id
                        LIMIT 1
                    )
                )

    UNION ALL

    -- Events with reactions but no comments
    SELECT 
        e.id,
        e.nombre,
        e.descripcion,
        e.fecha,
        e.hora,
        e.direccion,
        e.portada,
        e.nombre_estado,
        e.nombre_municipio,
        e.latitud_ubicacion,
        e.longitud_ubicacion,
        e.estatus,
        e.duracion,
        e.costo,
        (
            SELECT json_agg(
                json_build_object(
                    'id', c.id,
                    'nombre', c.nombre,
                    'emoji', c.emoji,
                    'color', c.color
                )
            )
            FROM categorias c
            JOIN categorias_eventos ce ON c.id = ce.id_categoria
            WHERE ce.id_evento = e.id
        ) AS categorias,
        reaccion.tipo_reaccion::TEXT AS reaccion_usuario,
        NULL AS comentarios
    FROM eventos e
    LEFT JOIN (
        SELECT id_evento, tipo_reaccion
        FROM reacciones
        WHERE id_usuario = user_id
    ) reaccion ON e.id = reaccion.id_evento
    WHERE 
    (filter_reactions IS NULL OR reaccion.tipo_reaccion::text = ANY(filter_reactions))
            AND
            -- Filter by upcoming events
            (NOT filter_upcoming OR e.fecha >= CURRENT_DATE)
            AND
            -- Filter by finished events
            (NOT filter_finished OR e.fecha < CURRENT_DATE)
            AND
    reaccion.tipo_reaccion IS NOT NULL
) AS subquery
GROUP BY fecha
ORDER BY fecha DESC


    ) AS events;

    RETURN events_json;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.manejar_evento_interes_notificacion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
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
    'Se acaba de publicar un evento de categoría "',
    categorias.nombre,
    '" en tu ciudad (',
    eventos.nombre_municipio,
    ', ',
    eventos.nombre_estado,
    ') con el nombre de "',
    eventos.nombre,
    '"'
  ),
  'Evento Interés',
  categorias_preferidas.id_usuario,
  eventos.id,
  eventos.id,
  eventos.portada
FROM
  categorias_preferidas
  INNER JOIN usuarios ON categorias_preferidas.id_usuario = usuarios.id
  INNER JOIN categorias ON categorias_preferidas.id_categoria = categorias.id
  -- Filtro para comprobar que el usuario al que se le va a notificar tenga activada la preferencia de eventos de interes en sus notificaciones
  INNER JOIN preferencias_notificaciones ON categorias_preferidas.id_usuario = preferencias_notificaciones.id_usuario
  AND preferencias_notificaciones.preferencia_notificacion = 'evento_interes'
  INNER JOIN estados ON usuarios.estado = estados.id
  INNER JOIN municipios ON usuarios.municipio = municipios.id
  INNER JOIN eventos ON eventos.id = new.id_evento
  -- Filtros para comprobar que al usuario al que se le va a notificar, pertenezca al mismo estado y ciudad que el evento publicado
  AND eventos.nombre_estado = estados.nombre
  AND eventos.nombre_municipio = municipios.nombre
  -- Filtro para comprobar que el usuario al que se le va a notificar no sea el mismo que quien creo el evento
  AND eventos.id_usuario != categorias_preferidas.id_usuario
  -- esto es para ver si ya hay una notificacion del tipo evento de interes hacia el mismo usuario, esto con el fin de evitar, que si por ejemplo, un evento tiene 3 categorias y el usuario tiene esas 3 categorias como preferidas, que no le vayan a llegar 3 notificaciones del mismo evento (esto porque el trigger se va a ejecutar por cada fila insertada en la tabla categorias_eventos, ya que no es posible con un "statement" porque no se puede saber que datos se insertaron en esa tabla al mismo tiempo)
  FULL OUTER JOIN notificaciones ON notificaciones.id_usuario_a_notificar = categorias_preferidas.id_usuario
  AND tipo = 'Evento Interés'
  AND notificaciones.id_recurso_notificador = eventos.id::text
WHERE
  categorias_preferidas.id_categoria = new.id_categoria
  -- este es el filtro que se encarga de checar que no haya notificaciones del mismo tipo, para el mismo usuario y evento, de modo que no se repitan (problema mencionado arriba)
  AND notificaciones.id IS NULL;

  return new;
end;$function$
;

grant delete on table "public"."customers" to "anon";

grant insert on table "public"."customers" to "anon";

grant references on table "public"."customers" to "anon";

grant select on table "public"."customers" to "anon";

grant trigger on table "public"."customers" to "anon";

grant truncate on table "public"."customers" to "anon";

grant update on table "public"."customers" to "anon";

grant delete on table "public"."customers" to "authenticated";

grant insert on table "public"."customers" to "authenticated";

grant references on table "public"."customers" to "authenticated";

grant select on table "public"."customers" to "authenticated";

grant trigger on table "public"."customers" to "authenticated";

grant truncate on table "public"."customers" to "authenticated";

grant update on table "public"."customers" to "authenticated";

grant delete on table "public"."customers" to "service_role";

grant insert on table "public"."customers" to "service_role";

grant references on table "public"."customers" to "service_role";

grant select on table "public"."customers" to "service_role";

grant trigger on table "public"."customers" to "service_role";

grant truncate on table "public"."customers" to "service_role";

grant update on table "public"."customers" to "service_role";


