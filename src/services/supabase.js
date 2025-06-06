import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvrjcopzrmtlklbmdrri.supabase.co' // ← je te remplace l'URL ici
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cmpjb3B6cm10bGtsYm1kcnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDE2MjYsImV4cCI6MjA2NDc3NzYyNn0.cWME9-PH8smIv5t9w1Td2wbVIyaw5ivavahK4TpGrR0' // ← ta clé Supabase publique ici

export const supabase = createClient(supabaseUrl, supabaseKey)
