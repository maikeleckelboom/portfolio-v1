import { JSONContent } from '@tiptap/vue-3'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      experiences: {
        Row: {
          id: number
          type: string
          startDate: string
          endDate: string
          roleName: string
          roleDescription: JSONContent
          companyName: string
          companyWebsite: string
          companyDescription: JSONContent
          companyLocation: string
          createdAt: string
        }
        Insert: {
          type: string | null
        }
        Update: {}
      }
      files: {
        Row: {
          id: number
          name: string
          filepath: string
          size: number
          mimetype: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          name: string | null
          description: string | null
          created_at?: string | null
        }
        Update: {
          name: string | null
          description: string | null
          created_at?: string | null
        }
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
