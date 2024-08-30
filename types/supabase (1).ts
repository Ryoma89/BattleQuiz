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
      answeroption: {
        Row: {
          created_at: string | null
          is_correct: boolean | null
          option_id: string
          option_text: string
          question_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          is_correct?: boolean | null
          option_id?: string
          option_text: string
          question_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          is_correct?: boolean | null
          option_id?: string
          option_text?: string
          question_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answeroption_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["question_id"]
          },
        ]
      }
      Profiles: {
        Row: {
          account_name: string | null
          created_at: string | null
          email: string
          introduce: string | null
          is_first_login: boolean | null
          profile_picture: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          account_name?: string | null
          created_at?: string | null
          email: string
          introduce?: string | null
          is_first_login?: boolean | null
          profile_picture?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          account_name?: string | null
          created_at?: string | null
          email?: string
          introduce?: string | null
          is_first_login?: boolean | null
          profile_picture?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      question: {
        Row: {
          created_at: string | null
          question_id: string
          question_text: string
          question_type: string | null
          quiz_id: string | null
          time_limit: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          question_id?: string
          question_text: string
          question_type?: string | null
          quiz_id?: string | null
          time_limit?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          question_id?: string
          question_text?: string
          question_type?: string | null
          quiz_id?: string | null
          time_limit?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
        ]
      }
      quiz: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          quiz_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          quiz_id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          quiz_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      useranswer: {
        Row: {
          created_at: string | null
          question_id: string | null
          selected_option_id: string | null
          updated_at: string | null
          user_answer_id: string
          user_quiz_id: string | null
        }
        Insert: {
          created_at?: string | null
          question_id?: string | null
          selected_option_id?: string | null
          updated_at?: string | null
          user_answer_id?: string
          user_quiz_id?: string | null
        }
        Update: {
          created_at?: string | null
          question_id?: string | null
          selected_option_id?: string | null
          updated_at?: string | null
          user_answer_id?: string
          user_quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "useranswer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "useranswer_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "answeroption"
            referencedColumns: ["option_id"]
          },
          {
            foreignKeyName: "useranswer_user_quiz_id_fkey"
            columns: ["user_quiz_id"]
            isOneToOne: false
            referencedRelation: "userquiz"
            referencedColumns: ["user_quiz_id"]
          },
        ]
      }
      userquiz: {
        Row: {
          completed_at: string | null
          created_at: string | null
          quiz_id: string | null
          score: number | null
          updated_at: string | null
          user_id: string | null
          user_quiz_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          quiz_id?: string | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_quiz_id?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          quiz_id?: string | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userquiz_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "userquiz_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["user_id"]
          },
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
