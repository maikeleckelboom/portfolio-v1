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
          dateStart: string
          dateEnd: string
          tags: string[]
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
