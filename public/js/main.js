import {deleteTweet} from './tweetFunctions.js'

const tweet = document.getElementById('content')

const submit = document.getElementById('button')

const username = document.getElementById("uname")

const un_get = new XMLHttpRequest()

const feeding = new XMLHttpRequest();

const uid = {
    id:window.localStorage.getItem('ID')
}

un_get.open('POST','/user')
un_get.setRequestHeader('content-type','application/json')
un_get.send(JSON.stringify(uid));
un_get.onreadystatechange = ()=>{
    if(un_get.readyState == 4 && un_get.status == 200) {
        let str = JSON.parse(un_get.response)
        username.textContent = `Hello, ${str}`
    }else if(!window.localStorage.ID){
        window.location = un_get.responseURL
    }
}

const http = new XMLHttpRequest()

const feed = document.getElementById('tweets')

submit.addEventListener('click', send)


function send() {
    if(tweet.value != ""){
    let tweeting = {
        body : tweet.value,
        user : uid.id,
    }
    http.open('POST','/mew',true)

    http.setRequestHeader('content-type','application/json')


    http.send(JSON.stringify(tweeting))
    
    http.onreadystatechange = ()=>{
        if(http.readyState == 4 && http.status == 200){
            window.location=http.responseURL;
            }
        }
    }
}


feeding.open("POST","/feed");
feeding.setRequestHeader('content-type','application/json')
feeding.send(JSON.stringify(uid))
feeding.onreadystatechange=()=>{
    if(feeding.readyState == 4 && feeding.status == 200) {
        let tweets = JSON.parse(feeding.responseText);
        for(let i = 0; i<tweets.length;i++){
            let p = document.createElement('p');
            let user = document.createElement('p')
            let div = document.createElement('div')
            let svg = document.createElement('span')
            svg.innerHTML = '<svg id="deleteBtn" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>'
            svg.id = 'svg'
            div.id = tweets[i].tweet_id;
            div.classList.add('tweet')
            user.textContent = tweets[i].uname;
            user.classList.add('users')
            p.textContent =tweets[i].tweet; 
            p.classList.add('posted-tweets'); 
            div.append(user)
            div.append(svg)
            div.append(p)
            feed.append(div)
            let deleteBtn = document.getElementById("svg")
            deleteBtn.addEventListener("click",deleteTweet())
        }
    }
}



