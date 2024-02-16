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
          created_at: string
          descripcion: string | null
          direccion: string | null
          duracion: number
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
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          duracion: number
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
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          duracion?: number
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
      tabla_prueba: {
        Row: {
          id: number
          texto: string | null
        }
        Insert: {
          id?: number
          texto?: string | null
        }
        Update: {
          id?: number
          texto?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellidos: string
          celular: string
          created_at: string
          id: string
          nombres: string
        }
        Insert: {
          apellidos: string
          celular: string
          created_at?: string
          id: string
          nombres: string
        }
        Update: {
          apellidos?: string
          celular?: string
          created_at?: string
          id?: string
          nombres?: string
        }
        Relationships: [
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
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
