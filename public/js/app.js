import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@1.28.0/dist/umd/supabase.min.js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjE0MzQ1NiwiZXhwIjoxOTUxNzE5NDU2fQ.-34dz8ixfgU2k9U1XEin9ETycmRPdGw68XLtdYKTSB8'

const SUPABASE_URL = "https://rwcskqzxmqcotrbcilsz.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded",function (event) {

  const em = document.querySelector("#email")
  const ps = document.querySelector("#pass")

  const logIn = (event)=> {
    supabase.auth
    .signIn({em , ps})
    .then((response)=>{
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err)=>{
      alert(err.response.text)
    })
  }

  function setToken(response) {
    if (response.data.confirmation_sent_at && !response.data.access.token){
      alert("Confirmation Email sent!")
    }else {
      alert("Logged in as "+response.user.email)
    }
  }

})


