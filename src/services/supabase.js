import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co' // ← je te remplace l'URL ici
const supabaseKey = 'your-anon-key' // ← ta clé Supabase publique ici

export const supabase = createClient(supabaseUrl, supabaseKey)