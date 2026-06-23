// TODO: Task 005 Supabase 설정 후 자동 생성 타입으로 교체
// npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts

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
      users: {
        Row: {
          id: string
          email: string
          notion_database_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          notion_database_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          notion_database_id?: string | null
          created_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          user_id: string
          notion_page_id: string
          invoice_number: string
          title: string
          client_name: string
          status: '대기' | '발행' | '완료' | '취소'
          total_amount: number
          issued_at: string
          expires_at: string | null
          synced_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notion_page_id: string
          invoice_number: string
          title: string
          client_name: string
          status?: '대기' | '발행' | '완료' | '취소'
          total_amount: number
          issued_at: string
          expires_at?: string | null
          synced_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notion_page_id?: string
          invoice_number?: string
          title?: string
          client_name?: string
          status?: '대기' | '발행' | '완료' | '취소'
          total_amount?: number
          issued_at?: string
          expires_at?: string | null
          synced_at?: string
        }
      }
      quote_items: {
        Row: {
          id: string
          quote_id: string
          name: string
          quantity: number
          unit_price: number
          amount: number
          sort_order: number
        }
        Insert: {
          id?: string
          quote_id: string
          name: string
          quantity: number
          unit_price: number
          amount: number
          sort_order?: number
        }
        Update: {
          id?: string
          quote_id?: string
          name?: string
          quantity?: number
          unit_price?: number
          amount?: number
          sort_order?: number
        }
      }
      share_links: {
        Row: {
          id: string
          quote_id: string
          token: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          quote_id: string
          token: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          quote_id?: string
          token?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
  }
}

// Supabase 자동 생성 타입과 동일한 헬퍼 타입 패턴
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
