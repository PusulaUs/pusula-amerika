import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qrthwbmhnrnauhmaervn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydGh3Ym1obnJuYXVobWFlcnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODM4OTIsImV4cCI6MjA4ODg1OTg5Mn0.BZOGNaGkp-dXuEd7CU96vbDFxlD9me6c-CKZU9xtt9c'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storageKey: 'pusula-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
})
