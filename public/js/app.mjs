import {supabase} from "./server.mjs"
let btn = document.querySelector("#send")

  const em = document.querySelector("#email")
  const ps = document.querySelector("#pass")

  const logIn = (event)=> {
    console.log(this);
     supabase.auth.signIn({em , ps})
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
  btn.addEventListener("click",logIn)


