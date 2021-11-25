import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://rwcskqzxmqcotrbcilsz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const SUPABASE_URL = "https://rwcskqzxmqcotrbcilsz.supabase.co"

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);

let { user, error } = await supabase.auth.signUp({
    uname: req.body.uname,
    pass: req.body.pass
  })