export default function tweeta(){
    const backend = 'https://twitter-draft-copy.herokuapp.com/'
    let un_url = document.URL
    let i =un_url.search("html")
    let origin = document.querySelector('#tweets')
    let div = document.createElement("div")
    let h4 = document.createElement('h4')
    let p = document.createElement('p')
i ={
    id:un_url.slice(i+5)
}
let tweet = class {
    constructor(div, h4, p, text, user, id, origin) {
        this.div = div,
        this.h4 = h4,
        this.p = p,
        p.textContent = text,
        h4.textContent = user,
        div.id = id,
        this.origin = origin
    }
}
let http = new XMLHttpRequest()
http.open("PUT",backend+"data",true)
http.setRequestHeader('content-type','application/json')
http.send(JSON.stringify(i))
http.onreadystatechange = () =>{
    if(http.readyState == 4 && http.status == 200) {
        let tweets = [];
        for (let i =0; i > http.response.length;i++){
            console.log(i);
        }
    }
}
}