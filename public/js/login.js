/*
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://rwcskqzxmqcotrbcilsz.supabase.co"

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);


let { user, error } = await supabase.auth.signIn({
    uname: us.value,
    password: ps.value
})


const em = document.querySelector('#email')
const ps = document.querySelector('#pass')
let btn = document.querySelector("#send")
btn.addEventListener("click",loginIn)


const loginIn = (event)=>{
    event.preventDefault();
    const email = em.value
    const pass = ps.value
    
    supabase.auth.signIn({email,pass})
    .then((response)=>{
        response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err)=>{
        alert(err.response.text)
    })
}

function setToken(response){
    if(response.data.confirmation_sent_at && !response.data.access_token){
        alert('Confirmation email sent')
    }
}

*/
 /**********  OLD API *******/
 
const us = document.querySelector('#uname')
const ps = document.querySelector('#pass')
const http = new XMLHttpRequest();
let btn = document.querySelector("#send")
btn.addEventListener("click",sending)


function sending(e){
    e.preventDefault();
    var login = {
        uname : us.value,
        pass : ps.value
    }
        http.open("POST","http://localhost:3000/login")
        http.setRequestHeader('content-type','application/json')
        http.send(JSON.stringify(login));
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let uid = {id:this.response}
                http.open("post","127.0.0.1:3000/getID")
                http.setRequestHeader('content-type','application/json')
                http.send(JSON.stringify(uid))
                http.onreadystatechange = ()=>{
                    if(this.readyState == 4 && this.status == 200) {
                        window.location= this.response
                    }
                }
            } else {
                document.getElementById('err').innerText = this.response
            }
        }
}
