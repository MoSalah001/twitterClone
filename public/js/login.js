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
        http.open("POST","/login")
        http.setRequestHeader('content-type','application/json')
        http.send(JSON.stringify(login));
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let data = JSON.parse(this.response)
                const uid = {id:data.id}
               window.localStorage.setItem('ID',uid.id)
               return window.location = data.url
            }
            else if (this.readyState==4 && this.status == 404) {
                return document.querySelector('#err').textContent =this.responseText
            }
        }
    }