
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "public";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."estatus_evento" AS ENUM (
    'disponible',
    'vencido'
);

ALTER TYPE "public"."estatus_evento" OWNER TO "postgres";

CREATE TYPE "public"."tipo_notificacion" AS ENUM (
    'Me gusta',
    'No me gusta',
    'Asistiré',
    'Evento Interés',
    'Comentario'
);

ALTER TYPE "public"."tipo_notificacion" OWNER TO "postgres";

CREATE TYPE "public"."tipo_preferencia_notificacion" AS ENUM (
    'reaccion',
    'comentario',
    'evento_interes'
);

ALTER TYPE "public"."tipo_preferencia_notificacion" OWNER TO "postgres";

CREATE TYPE "public"."tipo_reaccion" AS ENUM (
    'Me gusta',
    'No me gusta',
    'Asistiré'
);

ALTER TYPE "public"."tipo_reaccion" OWNER TO "postgres";

CREATE TYPE "public"."user_roles" AS ENUM (
    'admin',
    'usuario'
);

ALTER TYPE "public"."user_roles" OWNER TO "postgres";

COMMENT ON TYPE "public"."user_roles" IS 'rol de usuarios';

CREATE OR REPLACE FUNCTION "public"."actualizar_contrasena"("iduser" "uuid", "current_pass" character varying, "new_pass" character varying) RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  user_id varchar;
BEGIN
select id from auth.users where id = idUser and encrypted_password=crypt(current_pass::text, auth.users.encrypted_password) into user_id;
IF NOT FOUND THEN
    RAISE EXCEPTION 'contraseña incorrecta';
END IF;
UPDATE auth.users SET 
  encrypted_password =
  crypt(new_pass, gen_salt('bf'))
  WHERE id = idUser;
return user_id;
end
$$;

ALTER FUNCTION "public"."actualizar_contrasena"("iduser" "uuid", "current_pass" character varying, "new_pass" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."actualizar_estatus_evento"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE eventos
    SET estatus = 'vencido'
    WHERE TO_TIMESTAMP(fecha || ' ' || hora, 'YYYY-MM-DD HH24:MI:SS') + 
          (CASE WHEN duracion > 3 THEN '3 hours' ELSE (duracion || ' hours') END)::interval < NOW();
END;
$$;

ALTER FUNCTION "public"."actualizar_estatus_evento"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."actualizar_estatus_evento"("fecha_actual" timestamp without time zone) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Si la fecha_actual coincide con la fecha del evento, obtener hasta 3 horas después de la hora del evento
    IF EXISTS (SELECT 1 FROM destacados d JOIN eventos e ON d.id_evento = e.id 
               WHERE e.fecha = fecha_actual AND (e.fecha + e.hora + INTERVAL '3 hours') > now()) THEN
        UPDATE tu_tabla -- Reemplaza "tu_tabla" con el nombre de tu tabla donde se almacena el estado del evento
        SET estado = 'Activo' -- Cambia 'Activo' por el estado deseado
        WHERE id_evento IN (SELECT d.id_evento FROM destacados d JOIN eventos e ON d.id_evento = e.id 
                            WHERE e.fecha = fecha_actual AND (e.fecha + e.hora + INTERVAL '3 hours') > now());
    ELSE
        -- Si la fecha_actual no coincide con la fecha del evento, obtener los eventos dentro del rango de fechas y horas
        UPDATE tu_tabla -- Reemplaza "tu_tabla" con el nombre de tu tabla donde se almacena el estado del evento
        SET estado = 'Activo' -- Cambia 'Activo' por el estado deseado
        WHERE id_evento IN (SELECT d.id_evento FROM destacados d JOIN eventos e ON d.id_evento = e.id 
                            WHERE (e.fecha = fecha_actual AND e.hora >= now()::time)
                            OR (e.fecha > fecha_actual AND (e.fecha + e.hora) >= now()));
    END IF;
END;
$$;

ALTER FUNCTION "public"."actualizar_estatus_evento"("fecha_actual" timestamp without time zone) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  INSERT INTO preferencias_notificaciones (id_usuario, preferencia_notificacion) VALUES (new.id, 'reaccion');

  INSERT INTO preferencias_notificaciones (id_usuario, preferencia_notificacion) VALUES (new.id, 'comentario');
  
  RETURN new;
END;$$;

ALTER FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_destacados_ids"() RETURNS TABLE("id_evento" bigint)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT d.id_evento
  FROM destacados d
  JOIN eventos e ON d.id_evento = e.id
  WHERE
    CASE WHEN e.fecha < current_date THEN  -- Not on 11/03/2024
      (d.fecha_inicio <= current_date AND
       d.fecha_final >= current_date AND
       d.hora_inicio <= current_time AND
       d.hora_final >= current_time)
    ELSE  -- On 11/03/2024
      e.hora + INTERVAL '3 hours' >= current_time
      and
      d.fecha_final = e.fecha
    END;
END;
$$;

ALTER FUNCTION "public"."get_destacados_ids"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_events_with_categories"("filter_start_date" "date" DEFAULT NULL::"date", "filter_start_time" time without time zone DEFAULT NULL::time without time zone, "filter_end_date" "date" DEFAULT NULL::"date", "filter_end_time" time without time zone DEFAULT NULL::time without time zone, "filter_categories" integer[] DEFAULT NULL::integer[]) RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    events_json JSON;
BEGIN
    -- Perform SQL queries to join the tables and aggregate data
    SELECT json_agg(row_to_json(events_with_categories))
    INTO events_json
    FROM (
        SELECT
            e.*,
            json_agg(c.*) AS categorias
        FROM
            eventos e
        LEFT JOIN
            categorias_eventos ce ON e.id = ce.id_evento
        LEFT JOIN
            categorias c ON ce.id_categoria = c.id
        WHERE
           ( e.estatus = 'disponible' )AND
     (
    filter_categories IS NULL OR c.id = ANY(filter_categories)
)
 AND (
    (filter_start_date IS NULL OR e.fecha >= filter_start_date) -- Start date filter
    AND (filter_end_date IS NULL OR e.fecha <= filter_end_date) -- End date filter
    AND (filter_start_time IS NULL OR e.hora >= filter_start_time) -- Start time filter
    AND (filter_end_time IS NULL OR e.hora <= filter_end_time) -- End time filter
)
        GROUP BY
            e.id
        ORDER BY
            ABS(extract(epoch from (e.fecha + e.hora) - CURRENT_TIMESTAMP)) ASC
    ) AS events_with_categories;

    -- Return the result
    RETURN events_json;
END;
$$;

ALTER FUNCTION "public"."get_events_with_categories"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_events_with_categories"("city_name" character varying, "state_name" character varying, "filter_start_date" "date" DEFAULT NULL::"date", "filter_start_time" time without time zone DEFAULT NULL::time without time zone, "filter_end_date" "date" DEFAULT NULL::"date", "filter_end_time" time without time zone DEFAULT NULL::time without time zone, "filter_categories" integer[] DEFAULT NULL::integer[]) RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    events_json JSON;
BEGIN
    -- Perform SQL queries to join the tables and aggregate data
    SELECT json_agg(row_to_json(events_with_categories))
    INTO events_json
    FROM (
        SELECT
            e.*,
            json_agg(c.*) AS categorias
        FROM
            eventos e
        LEFT JOIN
            categorias_eventos ce ON e.id = ce.id_evento
        LEFT JOIN
            categorias c ON ce.id_categoria = c.id
        WHERE
        (e.nombre_municipio = city_name)
        AND
        (e.nombre_estado = state_name)
        AND
        (e.estatus = 'disponible')
        AND
        (filter_categories IS NULL OR c.id = ANY(filter_categories))
        AND (
          (filter_start_date IS NULL OR e.fecha >= filter_start_date) -- Start date filter
          AND (filter_end_date IS NULL OR e.fecha <= filter_end_date) -- End date filter
          AND (filter_start_time IS NULL OR e.hora >= filter_start_time) -- Start time filter
          AND (filter_end_time IS NULL OR e.hora <= filter_end_time) -- End time filter
        )
        GROUP BY
            e.id
        ORDER BY
            ABS(extract(epoch from (e.fecha + e.hora) - CURRENT_TIMESTAMP)) ASC
    ) AS events_with_categories;

    -- Return the result
    RETURN events_json;
END;
$$;

ALTER FUNCTION "public"."get_events_with_categories"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_events_with_categories_and_reactions"("city_name" character varying, "state_name" character varying, "filter_start_date" "date" DEFAULT NULL::"date", "filter_start_time" time without time zone DEFAULT NULL::time without time zone, "filter_end_date" "date" DEFAULT NULL::"date", "filter_end_time" time without time zone DEFAULT NULL::time without time zone, "filter_categories" integer[] DEFAULT NULL::integer[]) RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$DECLARE
    events_json JSON;
BEGIN
    -- Perform SQL queries to join the tables and aggregate data
    SELECT json_agg(row_to_json(events_with_categories))
    INTO events_json
    FROM (
        SELECT
            e.*,
            json_agg(c.*) AS categorias
        FROM
            eventos_con_conteo_reacciones e
        LEFT JOIN
            categorias_eventos ce ON e.id = ce.id_evento
        LEFT JOIN
            categorias c ON ce.id_categoria = c.id
        WHERE
        (e.nombre_municipio = city_name)
        AND
        (e.nombre_estado = state_name)
        -- AND
        -- (e.estatus = 'disponible')
        AND
        (filter_categories IS NULL OR c.id = ANY(filter_categories))
        AND (
          (filter_start_date IS NULL OR e.fecha >= filter_start_date) -- Start date filter
          AND (filter_end_date IS NULL OR e.fecha <= filter_end_date) -- End date filter
          AND (filter_start_time IS NULL OR e.hora >= filter_start_time) -- Start time filter
          AND (filter_end_time IS NULL OR e.hora <= filter_end_time) -- End time filter
        )
        GROUP BY e.id, e.created_at, e.nombre, e.descripcion, e.fecha, e.hora, e.duracion, e.latitud_ubicacion, e.longitud_ubicacion, e.nombre_estado, e.nombre_municipio, e.direccion, e.portada, e.id_usuario, e.estatus, e.costo, e.cantidad_me_gusta, e.cantidad_no_me_gusta, e.cantidad_asistentes
        ORDER BY
            ABS(extract(epoch from (e.fecha + e.hora) - CURRENT_TIMESTAMP)) ASC
    ) AS events_with_categories;

    -- Return the result
    RETURN events_json;
END;$$;

ALTER FUNCTION "public"."get_events_with_categories_and_reactions"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_events_with_categories_and_reactions_no_location"("filter_start_date" "date" DEFAULT NULL::"date", "filter_start_time" time without time zone DEFAULT NULL::time without time zone, "filter_end_date" "date" DEFAULT NULL::"date", "filter_end_time" time without time zone DEFAULT NULL::time without time zone, "filter_categories" integer[] DEFAULT NULL::integer[]) RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$DECLARE
    events_json JSON;
BEGIN
    -- Perform SQL queries to join the tables and aggregate data
    SELECT json_agg(row_to_json(events_with_categories))
    INTO events_json
    FROM (
        SELECT
            e.*,
            json_agg(c.*) AS categorias
        FROM
            eventos_con_conteo_reacciones e
        LEFT JOIN
            categorias_eventos ce ON e.id = ce.id_evento
        LEFT JOIN
            categorias c ON ce.id_categoria = c.id
        WHERE
        -- (e.nombre_municipio = city_name)
        -- AND
        -- (e.nombre_estado = state_name)
        -- AND
        -- (e.estatus = 'disponible')
        -- AND
        (filter_categories IS NULL OR c.id = ANY(filter_categories))
        AND (
          (filter_start_date IS NULL OR e.fecha >= filter_start_date) -- Start date filter
          AND (filter_end_date IS NULL OR e.fecha <= filter_end_date) -- End date filter
          AND (filter_start_time IS NULL OR e.hora >= filter_start_time) -- Start time filter
          AND (filter_end_time IS NULL OR e.hora <= filter_end_time) -- End time filter
        )
        GROUP BY e.id, e.created_at, e.nombre, e.descripcion, e.fecha, e.hora, e.duracion, e.latitud_ubicacion, e.longitud_ubicacion, e.nombre_estado, e.nombre_municipio, e.direccion, e.portada, e.id_usuario, e.estatus, e.costo, e.cantidad_me_gusta, e.cantidad_no_me_gusta, e.cantidad_asistentes
        ORDER BY
            ABS(extract(epoch from (e.fecha + e.hora) - CURRENT_TIMESTAMP)) ASC
    ) AS events_with_categories;

    -- Return the result
    RETURN events_json;
END;$$;

ALTER FUNCTION "public"."get_events_with_categories_and_reactions_no_location"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_featured_events_in_featured_range"("fecha_actual" "date") RETURNS TABLE("id_evento" integer)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT d.id_evento
    FROM destacados d
    JOIN eventos e ON d.id_evento = e.id
    WHERE (
        (fecha_actual BETWEEN d.fecha_inicio AND d.fecha_final)
        AND (
            (e.fecha = fecha_actual AND e.hora + INTERVAL '3 hours' >= NOW())
            OR (e.fecha > fecha_actual)
        )
    );
END;
$$;

ALTER FUNCTION "public"."get_featured_events_in_featured_range"("fecha_actual" "date") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_preferred_categories_from_user"("user_id" "uuid") RETURNS SETOF "record"
    LANGUAGE "sql"
    AS $$
  select
  c.id, c.nombre, c.emoji, c.color,
  CASE WHEN cp.id_usuario is NULL THEN FALSE ELSE TRUE END AS preferida  
from
  categorias c
  left join categorias_preferidas cp on c.id = cp.id_categoria and cp.id_usuario = user_id;
$$;

ALTER FUNCTION "public"."get_preferred_categories_from_user"("user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_user_filtered_events_with_reactions_and_comments"("user_id" "uuid", "filter_reactions" "text"[] DEFAULT NULL::"text"[], "filter_upcoming" boolean DEFAULT false, "filter_finished" boolean DEFAULT false, "include_comments" boolean DEFAULT true) RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
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
$$;

ALTER FUNCTION "public"."get_user_filtered_events_with_reactions_and_comments"("user_id" "uuid", "filter_reactions" "text"[], "filter_upcoming" boolean, "filter_finished" boolean, "include_comments" boolean) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN

  -- actualiza la imagen del evento en la notificacion, cuando se actualiza en el evento
  UPDATE notificaciones SET url_imagen = new.portada WHERE id_recurso_notificador = new.id::text;

  return new;
END;$$;

ALTER FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN

  -- actualiza la imagen del usuario y el texto de la notificacion, para actualizar los nombres y apellidos del usuario
  UPDATE notificaciones SET url_imagen = new.url_imagen_perfil, texto = REPLACE(texto, CONCAT(old.nombres, ' ', old.apellidos), CONCAT(new.nombres, ' ', new.apellidos)) WHERE id_recurso_notificador = new.id::text;

  return new;
END;$$;

ALTER FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_comentario_evento_notificacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE 
  id_usuario_a_notificar_var uuid;
  preferencia_reaccion_id int8;
  nombre_evento varchar;
  nombres_usuario_que_reacciono varchar;
  apellidos_usuario_que_reacciono varchar;
  url_imagen_usuario text;
begin
  SELECT eventos.id_usuario, eventos.nombre INTO id_usuario_a_notificar_var, nombre_evento FROM eventos WHERE eventos.id = new.id_evento;

  -- si el usuario que comento es el mismo quien creo el evento, no notificarlo, early return
  IF id_usuario_a_notificar_var = new.id_usuario THEN
    return new;
  END IF;

  SELECT preferencias_notificaciones.id INTO preferencia_reaccion_id FROM preferencias_notificaciones WHERE preferencias_notificaciones.id_usuario = id_usuario_a_notificar_var AND preferencias_notificaciones.preferencia_notificacion = 'comentario';

  -- si el usuario no tiene activada la preferencia de recibir notificaciones de tipo comentario, early return
  IF preferencia_reaccion_id IS NULL THEN
    return new;
  END IF;

  SELECT usuarios.nombres, usuarios.apellidos, usuarios.url_imagen_perfil INTO nombres_usuario_que_reacciono, apellidos_usuario_que_reacciono, url_imagen_usuario FROM usuarios WHERE usuarios.id = new.id_usuario;

  INSERT INTO notificaciones (texto, tipo, id_usuario_a_notificar, id_recurso_notificador, id_evento, url_imagen) VALUES (CONCAT(nombres_usuario_que_reacciono, ' ', apellidos_usuario_que_reacciono, ' ', ' comentó en tu evento ', '"', nombre_evento, '"'), 'Comentario', id_usuario_a_notificar_var, new.id_usuario, new.id_evento, url_imagen_usuario);

  return new;
end;$$;

ALTER FUNCTION "public"."manejar_comentario_evento_notificacion"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_creacion_evento_estado_municipio"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE 
  id_estado_var int8 DEFAULT -2;
  cuenta_estados integer;
  cuenta_municipios integer;
begin
  SELECT COUNT(*) FROM estados WHERE nombre = new.nombre_estado INTO cuenta_estados;
  if cuenta_estados = 0 then
    insert into estados(nombre) values (new.nombre_estado) RETURNING estados.id INTO id_estado_var;
  end if;
  if id_estado_var = -2 then
    SELECT id FROM estados WHERE nombre = new.nombre_estado INTO id_estado_var;
  end if;
  SELECT COUNT(*) FROM municipios WHERE municipios.nombre = new.nombre_municipio AND municipios.id_estado = id_estado_var INTO cuenta_municipios;
  if cuenta_municipios = 0 then
    insert into municipios(nombre, id_estado) values (new.nombre_municipio, id_estado_var);
  end if;
  return new;
end;
$$;

ALTER FUNCTION "public"."manejar_creacion_evento_estado_municipio"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_evento_interes_notificacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$begin
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
end;$$;

ALTER FUNCTION "public"."manejar_evento_interes_notificacion"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manejar_reaccion_evento_notificacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE 
  id_usuario_a_notificar_var uuid;
  preferencia_reaccion_id int8;
  id_notificacion_posiblemente_ya_existente int8;
  nombre_evento varchar;
  url_imagen_usuario text;
  nombres_usuario_que_reacciono varchar;
  apellidos_usuario_que_reacciono varchar;
  texto_tipo varchar;
  tipo_notificacion_var tipo_notificacion;
begin
  SELECT eventos.id_usuario, eventos.nombre INTO id_usuario_a_notificar_var, nombre_evento FROM eventos WHERE eventos.id = new.id_evento;

  -- si el usuario que reacciono es el mismo quien creo el evento, no notificarlo, early return
  IF id_usuario_a_notificar_var = new.id_usuario THEN
    return new;
  END IF;

  SELECT preferencias_notificaciones.id INTO preferencia_reaccion_id FROM preferencias_notificaciones WHERE preferencias_notificaciones.id_usuario = id_usuario_a_notificar_var AND preferencias_notificaciones.preferencia_notificacion = 'reaccion';

  -- si el usuario no tiene activada la preferencia de recibir notificaciones de tipo reaccion, early return
  IF preferencia_reaccion_id IS NULL THEN
    return new;
  END IF;

  -- necesaria la reasignacion, porque como es un enum como que no lo acepta directamente como new.tipo_reaccion en el insert
  IF new.tipo_reaccion = 'Me gusta' THEN
    tipo_notificacion_var = 'Me gusta';
    texto_tipo = 'le dio me gusta';
  ELSIF new.tipo_reaccion = 'No me gusta' THEN
    tipo_notificacion_var = 'No me gusta';
    texto_tipo = 'le dio no me gusta';
  ELSE
    tipo_notificacion_var = 'Asistiré';
    texto_tipo = 'confirmó que asistirá';
  END IF;

  SELECT notificaciones.id INTO id_notificacion_posiblemente_ya_existente FROM notificaciones WHERE notificaciones.id_usuario_a_notificar = id_usuario_a_notificar_var AND notificaciones.id_recurso_notificador = new.id_usuario::text AND notificaciones.id_evento = new.id_evento AND notificaciones.tipo = tipo_notificacion_var;

  -- esto y el select de arriba es para evitar notificaciones de reacciones del mismo tipo al mismo usuario a notificar, con un mismo usuario que reacciono, para evitar "repeticiones". Por ejemplo, si el usuario A le da un me gusta a un evento del usuario B, se le notifica al usuario B, pero si el usuario A quita ese me gusta o lo cambia por otra reaccion y luego vuelve a dar me gusta, ese nuevo me gusta ya no es notificado para evitar repeticion/spam 
  IF id_notificacion_posiblemente_ya_existente IS NOT NULL THEN
    return new;
  END IF;

  SELECT usuarios.nombres, usuarios.apellidos, usuarios.url_imagen_perfil INTO nombres_usuario_que_reacciono, apellidos_usuario_que_reacciono, url_imagen_usuario FROM usuarios WHERE usuarios.id = new.id_usuario;
  
  INSERT INTO notificaciones (texto, tipo, id_usuario_a_notificar, id_recurso_notificador, id_evento, url_imagen) VALUES (CONCAT(nombres_usuario_que_reacciono, ' ', apellidos_usuario_que_reacciono, ' ', texto_tipo, ' a tu evento ', '"', nombre_evento, '"'), tipo_notificacion_var, id_usuario_a_notificar_var, new.id_usuario, new.id_evento, url_imagen_usuario);

  return new;
end;$$;

ALTER FUNCTION "public"."manejar_reaccion_evento_notificacion"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."categorias" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "nombre" character varying NOT NULL,
    "emoji" "text" NOT NULL,
    "color" "text"
);

ALTER TABLE "public"."categorias" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."categorias_eventos" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id_evento" bigint NOT NULL,
    "id_categoria" bigint NOT NULL
);

ALTER TABLE "public"."categorias_eventos" OWNER TO "postgres";

ALTER TABLE "public"."categorias_eventos" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categorias_eventos_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."categorias" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categorias_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."categorias_preferidas" (
    "id" bigint NOT NULL,
    "id_usuario" "uuid" NOT NULL,
    "id_categoria" bigint NOT NULL
);

ALTER TABLE "public"."categorias_preferidas" OWNER TO "postgres";

ALTER TABLE "public"."categorias_preferidas" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categorias_preferidas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."comentarios" (
    "id" bigint NOT NULL,
    "comentario" "text" DEFAULT ''::"text" NOT NULL,
    "id_usuario" "uuid" NOT NULL,
    "id_evento" bigint NOT NULL,
    "fecha" "date" DEFAULT "now"() NOT NULL,
    "hora" time without time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."comentarios" OWNER TO "postgres";

ALTER TABLE "public"."comentarios" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."comentarios_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."destacados" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fecha_inicio" "date",
    "fecha_final" "date",
    "hora_inicio" time without time zone,
    "hora_final" time without time zone,
    "evento_inicia" time without time zone,
    "id_evento" bigint
);

ALTER TABLE "public"."destacados" OWNER TO "postgres";

ALTER TABLE "public"."destacados" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."destacados_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."estados" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "clave" character varying,
    "nombre" character varying
);

ALTER TABLE "public"."estados" OWNER TO "postgres";

ALTER TABLE "public"."estados" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."estados_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."eventos" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "nombre" character varying NOT NULL,
    "descripcion" "text",
    "fecha" "date" NOT NULL,
    "hora" time without time zone NOT NULL,
    "duracion" bigint NOT NULL,
    "latitud_ubicacion" double precision NOT NULL,
    "longitud_ubicacion" double precision NOT NULL,
    "nombre_estado" character varying NOT NULL,
    "nombre_municipio" character varying NOT NULL,
    "direccion" "text",
    "portada" "text",
    "id_usuario" "uuid" NOT NULL,
    "estatus" "public"."estatus_evento" DEFAULT 'disponible'::"public"."estatus_evento",
    "costo" numeric DEFAULT '0'::numeric NOT NULL
);

ALTER TABLE "public"."eventos" OWNER TO "postgres";

COMMENT ON COLUMN "public"."eventos"."id_usuario" IS 'id del usuario que publico el evento';

CREATE OR REPLACE VIEW "public"."eventos_con_conteo_reacciones" AS
SELECT
    NULL::bigint AS "id",
    NULL::timestamp with time zone AS "created_at",
    NULL::character varying AS "nombre",
    NULL::"text" AS "descripcion",
    NULL::"date" AS "fecha",
    NULL::time without time zone AS "hora",
    NULL::bigint AS "duracion",
    NULL::double precision AS "latitud_ubicacion",
    NULL::double precision AS "longitud_ubicacion",
    NULL::character varying AS "nombre_estado",
    NULL::character varying AS "nombre_municipio",
    NULL::"text" AS "direccion",
    NULL::"text" AS "portada",
    NULL::"uuid" AS "id_usuario",
    NULL::"public"."estatus_evento" AS "estatus",
    NULL::numeric AS "costo",
    NULL::bigint AS "cantidad_me_gusta",
    NULL::bigint AS "cantidad_no_me_gusta",
    NULL::bigint AS "cantidad_asistentes";

ALTER TABLE "public"."eventos_con_conteo_reacciones" OWNER TO "postgres";

ALTER TABLE "public"."eventos" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."eventos_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."events_json" (
    "json_agg" "json"
);

ALTER TABLE "public"."events_json" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."municipios" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id_estado" bigint NOT NULL,
    "nombre" character varying,
    "clave" character varying
);

ALTER TABLE "public"."municipios" OWNER TO "postgres";

ALTER TABLE "public"."municipios" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."municipios_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."notificaciones" (
    "id" bigint NOT NULL,
    "fecha" "date" DEFAULT "now"() NOT NULL,
    "texto" "text" DEFAULT ''::"text" NOT NULL,
    "id_recurso_notificador" "text" NOT NULL,
    "tipo" "public"."tipo_notificacion" NOT NULL,
    "id_usuario_a_notificar" "uuid" NOT NULL,
    "vista" boolean DEFAULT false NOT NULL,
    "hora" time without time zone DEFAULT "now"() NOT NULL,
    "id_evento" bigint NOT NULL,
    "url_imagen" "text"
);

ALTER TABLE "public"."notificaciones" OWNER TO "postgres";

ALTER TABLE "public"."notificaciones" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."notificaciones_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."preferencias_notificaciones" (
    "id" bigint NOT NULL,
    "id_usuario" "uuid" NOT NULL,
    "preferencia_notificacion" "public"."tipo_preferencia_notificacion" NOT NULL
);

ALTER TABLE "public"."preferencias_notificaciones" OWNER TO "postgres";

ALTER TABLE "public"."preferencias_notificaciones" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."preferencias_notificaciones_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."reacciones" (
    "id" bigint NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id_evento" bigint NOT NULL,
    "id_usuario" "uuid" NOT NULL,
    "tipo_reaccion" "public"."tipo_reaccion" NOT NULL
);

ALTER TABLE "public"."reacciones" OWNER TO "postgres";

ALTER TABLE "public"."reacciones" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reacciones_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."test_table" (
    "id" bigint NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "name" "text"
);

ALTER TABLE "public"."test_table" OWNER TO "postgres";

ALTER TABLE "public"."test_table" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."test_table_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."usuarios" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "nombres" character varying NOT NULL,
    "apellidos" character varying NOT NULL,
    "celular" character varying NOT NULL,
    "email" character varying,
    "estado" bigint,
    "municipio" bigint,
    "url_imagen_perfil" "text",
    "rol" "public"."user_roles" DEFAULT 'usuario'::"public"."user_roles" NOT NULL
);

ALTER TABLE "public"."usuarios" OWNER TO "postgres";

ALTER TABLE ONLY "public"."categorias_eventos"
    ADD CONSTRAINT "categorias_eventos_pkey" PRIMARY KEY ("id", "id_evento", "id_categoria");

ALTER TABLE ONLY "public"."categorias"
    ADD CONSTRAINT "categorias_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."categorias_preferidas"
    ADD CONSTRAINT "categorias_preferidas_pkey" PRIMARY KEY ("id_usuario", "id_categoria");

ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."destacados"
    ADD CONSTRAINT "destacados_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."estados"
    ADD CONSTRAINT "estados_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."eventos"
    ADD CONSTRAINT "eventos_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."municipios"
    ADD CONSTRAINT "municipios_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."notificaciones"
    ADD CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."preferencias_notificaciones"
    ADD CONSTRAINT "preferencias_notificaciones_pkey" PRIMARY KEY ("id_usuario", "preferencia_notificacion");

ALTER TABLE ONLY "public"."reacciones"
    ADD CONSTRAINT "reacciones_pkey" PRIMARY KEY ("id_evento", "id_usuario");

ALTER TABLE ONLY "public"."test_table"
    ADD CONSTRAINT "test_table_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."usuarios"
    ADD CONSTRAINT "usuarios_celular_key" UNIQUE ("celular");

ALTER TABLE ONLY "public"."usuarios"
    ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE VIEW "public"."eventos_con_conteo_reacciones" AS
 SELECT "e"."id",
    "e"."created_at",
    "e"."nombre",
    "e"."descripcion",
    "e"."fecha",
    "e"."hora",
    "e"."duracion",
    "e"."latitud_ubicacion",
    "e"."longitud_ubicacion",
    "e"."nombre_estado",
    "e"."nombre_municipio",
    "e"."direccion",
    "e"."portada",
    "e"."id_usuario",
    "e"."estatus",
    "e"."costo",
    "sum"(
        CASE
            WHEN ("r"."tipo_reaccion" = 'Me gusta'::"public"."tipo_reaccion") THEN 1
            ELSE 0
        END) AS "cantidad_me_gusta",
    "sum"(
        CASE
            WHEN ("r"."tipo_reaccion" = 'No me gusta'::"public"."tipo_reaccion") THEN 1
            ELSE 0
        END) AS "cantidad_no_me_gusta",
    "sum"(
        CASE
            WHEN ("r"."tipo_reaccion" = 'Asistiré'::"public"."tipo_reaccion") THEN 1
            ELSE 0
        END) AS "cantidad_asistentes"
   FROM ("public"."eventos" "e"
     LEFT JOIN "public"."reacciones" "r" ON (("r"."id_evento" = "e"."id")))
  GROUP BY "e"."id";

CREATE OR REPLACE TRIGGER "actualizar_informacion_evento_notificacion" AFTER INSERT OR UPDATE ON "public"."eventos" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"();

CREATE OR REPLACE TRIGGER "actualizar_informacion_usuario_texto_notificacion" AFTER INSERT OR UPDATE ON "public"."usuarios" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"();

CREATE OR REPLACE TRIGGER "crear_estado_municipio_si_no_existen_al_crear_evento" BEFORE INSERT OR UPDATE ON "public"."eventos" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_creacion_evento_estado_municipio"();

CREATE OR REPLACE TRIGGER "crear_preferencias_notificaciones_defecto_para_nuevo_usuario" AFTER INSERT ON "public"."usuarios" FOR EACH ROW EXECUTE FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"();

CREATE OR REPLACE TRIGGER "notificar_comentario" AFTER INSERT ON "public"."comentarios" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_comentario_evento_notificacion"();

CREATE OR REPLACE TRIGGER "notificar_evento_interes" AFTER INSERT ON "public"."categorias_eventos" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_evento_interes_notificacion"();

CREATE OR REPLACE TRIGGER "notificar_reaccion" AFTER INSERT OR UPDATE ON "public"."reacciones" FOR EACH ROW EXECUTE FUNCTION "public"."manejar_reaccion_evento_notificacion"();

ALTER TABLE ONLY "public"."categorias_eventos"
    ADD CONSTRAINT "categorias_eventos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."categorias_eventos"
    ADD CONSTRAINT "categorias_eventos_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "public"."eventos"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."municipios"
    ADD CONSTRAINT "municipios_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "public"."estados"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."categorias_preferidas"
    ADD CONSTRAINT "public_categorias_preferidas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."categorias"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."categorias_preferidas"
    ADD CONSTRAINT "public_categorias_preferidas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "public_comentarios_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "public"."eventos"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "public_comentarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."destacados"
    ADD CONSTRAINT "public_destacados_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "public"."eventos"("id");

ALTER TABLE ONLY "public"."eventos"
    ADD CONSTRAINT "public_eventos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id");

ALTER TABLE ONLY "public"."notificaciones"
    ADD CONSTRAINT "public_notificaciones_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "public"."eventos"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."notificaciones"
    ADD CONSTRAINT "public_notificaciones_id_usuario_a_notificar_fkey" FOREIGN KEY ("id_usuario_a_notificar") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."preferencias_notificaciones"
    ADD CONSTRAINT "public_preferencias_notificaciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."reacciones"
    ADD CONSTRAINT "public_reacciones_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "public"."eventos"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."reacciones"
    ADD CONSTRAINT "public_reacciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."usuarios"
    ADD CONSTRAINT "public_usuarios_estado_fkey" FOREIGN KEY ("estado") REFERENCES "public"."estados"("id");

ALTER TABLE ONLY "public"."usuarios"
    ADD CONSTRAINT "public_usuarios_municipio_fkey" FOREIGN KEY ("municipio") REFERENCES "public"."municipios"("id");

ALTER TABLE ONLY "public"."usuarios"
    ADD CONSTRAINT "usuarios_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Allow insert, update, read and delete to auth users" ON "public"."reacciones" TO "authenticated";

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."notificaciones";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."reacciones";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;

GRANT ALL ON FUNCTION "public"."actualizar_contrasena"("iduser" "uuid", "current_pass" character varying, "new_pass" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."actualizar_contrasena"("iduser" "uuid", "current_pass" character varying, "new_pass" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."actualizar_contrasena"("iduser" "uuid", "current_pass" character varying, "new_pass" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"() TO "anon";
GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"() TO "service_role";

GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"("fecha_actual" timestamp without time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"("fecha_actual" timestamp without time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."actualizar_estatus_evento"("fecha_actual" timestamp without time zone) TO "service_role";

GRANT ALL ON FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"() TO "anon";
GRANT ALL ON FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."agregar_preferencias_defecto_en_creacion_usuario"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_destacados_ids"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_destacados_ids"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_destacados_ids"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_events_with_categories"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_events_with_categories"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_events_with_categories"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_events_with_categories"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_events_with_categories"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_events_with_categories"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions"("city_name" character varying, "state_name" character varying, "filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions_no_location"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions_no_location"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_events_with_categories_and_reactions_no_location"("filter_start_date" "date", "filter_start_time" time without time zone, "filter_end_date" "date", "filter_end_time" time without time zone, "filter_categories" integer[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_featured_events_in_featured_range"("fecha_actual" "date") TO "anon";
GRANT ALL ON FUNCTION "public"."get_featured_events_in_featured_range"("fecha_actual" "date") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_featured_events_in_featured_range"("fecha_actual" "date") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_preferred_categories_from_user"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_preferred_categories_from_user"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_preferred_categories_from_user"("user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_user_filtered_events_with_reactions_and_comments"("user_id" "uuid", "filter_reactions" "text"[], "filter_upcoming" boolean, "filter_finished" boolean, "include_comments" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_filtered_events_with_reactions_and_comments"("user_id" "uuid", "filter_reactions" "text"[], "filter_upcoming" boolean, "filter_finished" boolean, "include_comments" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_filtered_events_with_reactions_and_comments"("user_id" "uuid", "filter_reactions" "text"[], "filter_upcoming" boolean, "filter_finished" boolean, "include_comments" boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_evento_notificacion"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_actualizacion_datos_usuario_notificacion"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_comentario_evento_notificacion"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_comentario_evento_notificacion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_comentario_evento_notificacion"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_creacion_evento_estado_municipio"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_creacion_evento_estado_municipio"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_creacion_evento_estado_municipio"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_evento_interes_notificacion"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_evento_interes_notificacion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_evento_interes_notificacion"() TO "service_role";

GRANT ALL ON FUNCTION "public"."manejar_reaccion_evento_notificacion"() TO "anon";
GRANT ALL ON FUNCTION "public"."manejar_reaccion_evento_notificacion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."manejar_reaccion_evento_notificacion"() TO "service_role";

SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;

SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;

GRANT ALL ON TABLE "public"."categorias" TO "anon";
GRANT ALL ON TABLE "public"."categorias" TO "authenticated";
GRANT ALL ON TABLE "public"."categorias" TO "service_role";

GRANT ALL ON TABLE "public"."categorias_eventos" TO "anon";
GRANT ALL ON TABLE "public"."categorias_eventos" TO "authenticated";
GRANT ALL ON TABLE "public"."categorias_eventos" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categorias_eventos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categorias_eventos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categorias_eventos_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categorias_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categorias_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categorias_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."categorias_preferidas" TO "anon";
GRANT ALL ON TABLE "public"."categorias_preferidas" TO "authenticated";
GRANT ALL ON TABLE "public"."categorias_preferidas" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categorias_preferidas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categorias_preferidas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categorias_preferidas_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."comentarios" TO "anon";
GRANT ALL ON TABLE "public"."comentarios" TO "authenticated";
GRANT ALL ON TABLE "public"."comentarios" TO "service_role";

GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."destacados" TO "anon";
GRANT ALL ON TABLE "public"."destacados" TO "authenticated";
GRANT ALL ON TABLE "public"."destacados" TO "service_role";

GRANT ALL ON SEQUENCE "public"."destacados_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."destacados_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."destacados_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."estados" TO "anon";
GRANT ALL ON TABLE "public"."estados" TO "authenticated";
GRANT ALL ON TABLE "public"."estados" TO "service_role";

GRANT ALL ON SEQUENCE "public"."estados_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."estados_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."estados_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."eventos" TO "anon";
GRANT ALL ON TABLE "public"."eventos" TO "authenticated";
GRANT ALL ON TABLE "public"."eventos" TO "service_role";

GRANT ALL ON TABLE "public"."eventos_con_conteo_reacciones" TO "anon";
GRANT ALL ON TABLE "public"."eventos_con_conteo_reacciones" TO "authenticated";
GRANT ALL ON TABLE "public"."eventos_con_conteo_reacciones" TO "service_role";

GRANT ALL ON SEQUENCE "public"."eventos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."eventos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."eventos_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."events_json" TO "anon";
GRANT ALL ON TABLE "public"."events_json" TO "authenticated";
GRANT ALL ON TABLE "public"."events_json" TO "service_role";

GRANT ALL ON TABLE "public"."municipios" TO "anon";
GRANT ALL ON TABLE "public"."municipios" TO "authenticated";
GRANT ALL ON TABLE "public"."municipios" TO "service_role";

GRANT ALL ON SEQUENCE "public"."municipios_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."municipios_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."municipios_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."notificaciones" TO "anon";
GRANT ALL ON TABLE "public"."notificaciones" TO "authenticated";
GRANT ALL ON TABLE "public"."notificaciones" TO "service_role";

GRANT ALL ON SEQUENCE "public"."notificaciones_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notificaciones_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notificaciones_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."preferencias_notificaciones" TO "anon";
GRANT ALL ON TABLE "public"."preferencias_notificaciones" TO "authenticated";
GRANT ALL ON TABLE "public"."preferencias_notificaciones" TO "service_role";

GRANT ALL ON SEQUENCE "public"."preferencias_notificaciones_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."preferencias_notificaciones_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."preferencias_notificaciones_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."reacciones" TO "anon";
GRANT ALL ON TABLE "public"."reacciones" TO "authenticated";
GRANT ALL ON TABLE "public"."reacciones" TO "service_role";

GRANT ALL ON SEQUENCE "public"."reacciones_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reacciones_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reacciones_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."test_table" TO "anon";
GRANT ALL ON TABLE "public"."test_table" TO "authenticated";
GRANT ALL ON TABLE "public"."test_table" TO "service_role";

GRANT ALL ON SEQUENCE "public"."test_table_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."test_table_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."test_table_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."usuarios" TO "anon";
GRANT ALL ON TABLE "public"."usuarios" TO "authenticated";
GRANT ALL ON TABLE "public"."usuarios" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
