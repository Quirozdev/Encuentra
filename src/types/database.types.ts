export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categorias: {
        Row: {
          color: string | null
          created_at: string
          emoji: string
          id: number
          nombre: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          emoji: string
          id?: number
          nombre: string
        }
        Update: {
          color?: string | null
          created_at?: string
          emoji?: string
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      categorias_eventos: {
        Row: {
          created_at: string
          id: number
          id_categoria: number
          id_evento: number
        }
        Insert: {
          created_at?: string
          id?: number
          id_categoria: number
          id_evento: number
        }
        Update: {
          created_at?: string
          id?: number
          id_categoria?: number
          id_evento?: number
        }
        Relationships: [
          {
            foreignKeyName: "categorias_eventos_id_categoria_fkey"
            columns: ["id_categoria"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorias_eventos_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorias_eventos_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos_con_conteo_reacciones"
            referencedColumns: ["id"]
          }
        ]
      }
      estados: {
        Row: {
          clave: string | null
          created_at: string
          id: number
          nombre: string | null
        }
        Insert: {
          clave?: string | null
          created_at?: string
          id?: number
          nombre?: string | null
        }
        Update: {
          clave?: string | null
          created_at?: string
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      eventos: {
        Row: {
          costo: number
          created_at: string
          descripcion: string | null
          direccion: string | null
          duracion: number
          estatus: Database["public"]["Enums"]["estatus_evento"] | null
          fecha: string
          hora: string
          id: number
          id_usuario: string
          latitud_ubicacion: number
          longitud_ubicacion: number
          nombre: string
          nombre_estado: string
          nombre_municipio: string
          portada: string | null
        }
        Insert: {
          costo?: number
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          duracion: number
          estatus?: Database["public"]["Enums"]["estatus_evento"] | null
          fecha: string
          hora: string
          id?: number
          id_usuario: string
          latitud_ubicacion: number
          longitud_ubicacion: number
          nombre: string
          nombre_estado: string
          nombre_municipio: string
          portada?: string | null
        }
        Update: {
          costo?: number
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          duracion?: number
          estatus?: Database["public"]["Enums"]["estatus_evento"] | null
          fecha?: string
          hora?: string
          id?: number
          id_usuario?: string
          latitud_ubicacion?: number
          longitud_ubicacion?: number
          nombre?: string
          nombre_estado?: string
          nombre_municipio?: string
          portada?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_eventos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      events_json: {
        Row: {
          json_agg: Json | null
        }
        Insert: {
          json_agg?: Json | null
        }
        Update: {
          json_agg?: Json | null
        }
        Relationships: []
      }
      municipios: {
        Row: {
          clave: string | null
          created_at: string
          id: number
          id_estado: number
          nombre: string | null
        }
        Insert: {
          clave?: string | null
          created_at?: string
          id?: number
          id_estado: number
          nombre?: string | null
        }
        Update: {
          clave?: string | null
          created_at?: string
          id?: number
          id_estado?: number
          nombre?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "municipios_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id"]
          }
        ]
      }
      reacciones: {
        Row: {
          id: number
          id_evento: number
          id_usuario: string
          tipo_reaccion: Database["public"]["Enums"]["tipo_reaccion"]
          updated_at: string
        }
        Insert: {
          id?: number
          id_evento: number
          id_usuario: string
          tipo_reaccion: Database["public"]["Enums"]["tipo_reaccion"]
          updated_at?: string
        }
        Update: {
          id?: number
          id_evento?: number
          id_usuario?: string
          tipo_reaccion?: Database["public"]["Enums"]["tipo_reaccion"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_reacciones_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_reacciones_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos_con_conteo_reacciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_reacciones_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      test_table: {
        Row: {
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellidos: string
          celular: string
          created_at: string
          email: string | null
          estado: number | null
          id: string
          municipio: number | null
          nombres: string
        }
        Insert: {
          apellidos: string
          celular: string
          created_at?: string
          email?: string | null
          estado?: number | null
          id: string
          municipio?: number | null
          nombres: string
        }
        Update: {
          apellidos?: string
          celular?: string
          created_at?: string
          email?: string | null
          estado?: number | null
          id?: string
          municipio?: number | null
          nombres?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_usuarios_estado_fkey"
            columns: ["estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_usuarios_municipio_fkey"
            columns: ["municipio"]
            isOneToOne: false
            referencedRelation: "municipios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      eventos_con_conteo_reacciones: {
        Row: {
          cantidad_asistentes: number | null
          cantidad_me_gusta: number | null
          cantidad_no_me_gusta: number | null
          costo: number | null
          created_at: string | null
          descripcion: string | null
          direccion: string | null
          duracion: number | null
          estatus: Database["public"]["Enums"]["estatus_evento"] | null
          fecha: string | null
          hora: string | null
          id: number | null
          id_usuario: string | null
          latitud_ubicacion: number | null
          longitud_ubicacion: number | null
          nombre: string | null
          nombre_estado: string | null
          nombre_municipio: string | null
          portada: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_eventos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      actualizar_estatus_evento: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_events_with_categories:
        | {
            Args: {
              city_name: string
              state_name: string
              filter_start_date?: string
              filter_start_time?: string
              filter_end_date?: string
              filter_end_time?: string
              filter_categories?: number[]
            }
            Returns: Json
          }
        | {
            Args: {
              filter_start_date?: string
              filter_start_time?: string
              filter_end_date?: string
              filter_end_time?: string
              filter_categories?: number[]
            }
            Returns: Json
          }
      get_events_with_categories_and_reactions: {
        Args: {
          city_name: string
          state_name: string
          filter_start_date?: string
          filter_start_time?: string
          filter_end_date?: string
          filter_end_time?: string
          filter_categories?: number[]
        }
        Returns: Json
      }
    }
    Enums: {
      estatus_evento: "disponible" | "vencido"
      tipo_reaccion: "Me gusta" | "No me gusta" | "Asistiré"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
