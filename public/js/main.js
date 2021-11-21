const tweet = document.getElementById('content')

const submit = document.getElementById('button')

const username = document.getElementById("uname")

const un_get = new XMLHttpRequest()

const feeding = new XMLHttpRequest();

let id = window.location.search

window.localStorage.setItem("id",id.split('?').slice(1))

const uid = {
    id:window.localStorage.getItem('id')
}

un_get.open('POST','http://localhost:3000/user')
un_get.setRequestHeader('content-type','application/json')
un_get.send(JSON.stringify(uid));
console.log("hi")
un_get.onreadystatechange = ()=>{
    if(un_get.readyState == 4 && un_get.status == 200) {
        let str = JSON.parse(un_get.response)
        console.log(un_get.response);
        username.textContent = `Hello, ${str}`
    }else if( uid.id < 1){
        window.location = un_get.responseURL
    }
}

const http = new XMLHttpRequest()

const feed = document.getElementById('tweets')

submit.addEventListener('click', send)


function send() {
    let tweeting = {
        body : tweet.value,
        user : uid,
    }
    
    http.open('POST','http://localhost:3000/mew',true)

    http.setRequestHeader('content-type','application/json')


    http.send(JSON.stringify(tweeting))
    
    http.onreadystatechange = ()=>{
        if(http.readyState == 4 && http.status == 200){
            window.location=http.responseURL+`?${uid.id}`;
        }
    }
}


feeding.open("POST","http://localhost:3000/feed");
feeding.setRequestHeader('content-type','application/json')
feeding.send(JSON.stringify(uid))
feeding.onreadystatechange=()=>{
    if(feeding.readyState == 4 && feeding.status == 200) {
        let tweets = JSON.parse(feeding.responseText);
        for(let i = 0; i<tweets.length;i++){
            let p = document.createElement('p');
            let user = document.createElement('p')
            let div = document.createElement('div')
            div.id = tweets[i].tweet_id;
            div.classList.add('tweet')
            user.textContent = tweets[i].uname;
            p.textContent =tweets[i].tweet; 
            div.append(user)
            div.append(p)
            feed.append(div)
        }
    }
}



