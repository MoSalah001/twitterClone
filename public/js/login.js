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
                console.log(uid);
                http.open("post","http://localhost:3000/getID")
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