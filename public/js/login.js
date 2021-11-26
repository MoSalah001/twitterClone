const us = document.querySelector('#uname')
const ps = document.querySelector('#pass')
const http = new XMLHttpRequest();
let btn = document.querySelector("#send")
btn.addEventListener("click",sending)

const backend = 'https://twitter-draft-copy.herokuapp.com/'

function sending(e){
    e.preventDefault();
    var login = {
        uname : us.value,
        pass : ps.value
    }
        http.open("POST",backend+"login")
        http.setRequestHeader('content-type','application/json')
        http.send(JSON.stringify(login));
        http.onreadystatechange = function(){
            if(this.readyState == 200 && this.status == 200){
                let data = JSON.parse(this.response)
                const uid = {id:data.id}
               window.localStorage.setItem('ID',uid.id)
               return window.location = data.url
            }if (this.status == 404) {document.querySelector('#err').textContent =this.responseText} 
            else {
                document.querySelector('#err').textContent =this.responseText
            }
        }
    }