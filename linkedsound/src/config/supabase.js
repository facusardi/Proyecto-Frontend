import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://notmgbientnrhmtuyjor.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdG1nYmllbnRucmhtdHV5am9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODExNzIsImV4cCI6MjA3NjY1NzE3Mn0.vm6iZf1zhivYkQMFk70IJnGGqjTBsf3_XgEBmBQ3EnQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)