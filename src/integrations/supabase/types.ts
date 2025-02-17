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
      circle_contributions: {
        Row: {
          amount: number
          circle_id: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          circle_id: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          circle_id?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_contributions_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_contributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          created_at: string | null
          creator_id: string
          deadline: string | null
          description: string | null
          id: string
          location: string | null
          name: string
          target_amount: number
          type: Database["public"]["Enums"]["circle_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          deadline?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name: string
          target_amount?: number
          type?: Database["public"]["Enums"]["circle_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          deadline?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          target_amount?: number
          type?: Database["public"]["Enums"]["circle_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      loans: {
        Row: {
          amount: number
          borrower_id: string
          created_at: string
          currency: Database["public"]["Enums"]["supported_currency"]
          due_date: string
          id: string
          interest_rate: number
          lender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          borrower_id: string
          created_at?: string
          currency: Database["public"]["Enums"]["supported_currency"]
          due_date: string
          id?: string
          interest_rate: number
          lender_id: string
          status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          borrower_id?: string
          created_at?: string
          currency?: Database["public"]["Enums"]["supported_currency"]
          due_date?: string
          id?: string
          interest_rate?: number
          lender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          id_number: string | null
          id_type: Database["public"]["Enums"]["id_type"] | null
          phone_number: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          id_number?: string | null
          id_type?: Database["public"]["Enums"]["id_type"] | null
          phone_number?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          id_number?: string | null
          id_type?: Database["public"]["Enums"]["id_type"] | null
          phone_number?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          recipient_name: string | null
          type: string
          updated_at: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          recipient_name?: string | null
          type: string
          updated_at?: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          recipient_name?: string | null
          type?: string
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_pins: {
        Row: {
          attempts: number | null
          created_at: string
          id: string
          pin_hash: string
          status: Database["public"]["Enums"]["pin_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          created_at?: string
          id?: string
          pin_hash: string
          status?: Database["public"]["Enums"]["pin_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          created_at?: string
          id?: string
          pin_hash?: string
          status?: Database["public"]["Enums"]["pin_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string
          expires_at: string
          id: string
          status: Database["public"]["Enums"]["verification_status"] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string
          expires_at: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: Database["public"]["Enums"]["supported_currency"]
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency: Database["public"]["Enums"]["supported_currency"]
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["supported_currency"]
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_wallet_lending_stats: {
        Args: {
          wallet_owner_id: string
          wallet_currency: Database["public"]["Enums"]["supported_currency"]
        }
        Returns: {
          total_lent: number
          total_expected_interest: number
        }[]
      }
      get_wallet_transactions: {
        Args: {
          p_wallet_currency: Database["public"]["Enums"]["supported_currency"]
          p_user_id: string
          p_limit?: number
        }
        Returns: {
          amount: number
          running_balance: number
          created_at: string
        }[]
      }
    }
    Enums: {
      circle_type: "fundraiser" | "community" | "event"
      id_type: "national_id" | "passport" | "drivers_license"
      pin_status: "active" | "disabled"
      supported_currency: "GBP" | "USD" | "KES" | "EUR"
      verification_status: "pending" | "verified" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
