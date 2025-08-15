import { createClient } from '@supabase/supabase-js'

// Para produção, use as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Verificar se as credenciais são válidas
const hasValidCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && 
                           supabaseAnonKey !== 'placeholder-key'

export const supabase = hasValidCredentials ? 
  createClient(supabaseUrl, supabaseAnonKey) : 
  null

export interface Guest {
  id?: number
  name: string
  confirmed?: boolean
  message?: string
  created_at?: string
  updated_at?: string
}

export interface Message {
  id?: number
  guest_name: string
  message: string
  created_at?: string
}
