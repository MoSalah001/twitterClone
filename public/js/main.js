const tweet = document.getElementById('content')

const submit = document.getElementById('button')

const username = document.getElementById("uname")

const backend = 'https://twitter-draft-copy.herokuapp.com/'

const un_get = new XMLHttpRequest()

const feeding = new XMLHttpRequest();

const uid = {
    id:window.localStorage.getItem('ID')
}

un_get.open('POST',backend+'user')
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
    let tweeting = {
        body : tweet.value,
        user : uid.id,
    }
    
    http.open('POST',backend+'mew',true)

    http.setRequestHeader('content-type','application/json')


    http.send(JSON.stringify(tweeting))
    
    http.onreadystatechange = ()=>{
        if(http.readyState == 4 && http.status == 200){
            window.location=http.responseURL+`?${uid.id}`;
        }
    }
}


feeding.open("POST",backend+"feed");
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



