const us = document.querySelector('#uname')
const ps = document.querySelector('#pass')
const pschk = document.querySelector('#passchk')
const ml = document.querySelector('#mail')
const mlchk = document.querySelector('#mailchk')
const http = new XMLHttpRequest();
let btn = document.querySelector("#send")
btn.addEventListener("click",sending)

function sending(e){
    e.preventDefault();
    if(ps.value === pschk.value && ml.value === mlchk.value && us !=""){
    var reg = {
        uname : us.value,
        pass : ps.value,
        mail: ml.value
    }
        http.open("POST","http://localhost:3000/reg")
        http.setRequestHeader('content-type','application/json')
        http.send(JSON.stringify(reg));
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                window.location = this.responseURL
            } else {
                document.getElementById('err').innerText = this.response
            }
        }
}else {
    document.getElementById('err').innerText ="Please complete all fields"
}
}