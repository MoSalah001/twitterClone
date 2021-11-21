import {createClient} from "@supabase/supabase-js"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjE0MzQ1NiwiZXhwIjoxOTUxNzE5NDU2fQ.-34dz8ixfgU2k9U1XEin9ETycmRPdGw68XLtdYKTSB8'

const SUPABASE_URL = "https://rwcskqzxmqcotrbcilsz.supabase.co"
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
)