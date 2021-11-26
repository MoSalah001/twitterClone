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
            if(this.readyState == 3 && this.status == 200){
                console.log("first if");
                let data = JSON.parse(this.response)
                const uid = {id:data.id}
               window.localStorage.setItem('ID',uid.id)
               return window.location = data.url
            }
            else if (this.status == 404) {
                console.log("first else if");
                document.querySelector('#err').textContent =this.responseText
            }
            else if(this.readyState == 4){
                console.log("second else if"); 
                let data = JSON.parse(this.response)
                const uid = {id:data.id}
               window.localStorage.setItem('ID',uid.id)
               return window.location = data.url
            }
            else {
                console.log("the else statement");
                document.querySelector('#err').textContent =this.responseText
            }
        }
    }