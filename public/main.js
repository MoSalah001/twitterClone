import {deleteTweet} from './tweetFunctions.mjs'

const tweet = document.getElementById('content')

const submit = document.getElementById('button')

const username = document.getElementById("username")

const un_get = new XMLHttpRequest()

const feeding = new XMLHttpRequest();

const uname = {
    user:document.cookie
}
checkCookie(); // trigger user check proccess

function checkCookie() // check for user existence and prevent unallowed logins
{ 
    if(!document.cookie =="")
    {
        greetUser();
    } 
    else 
    {
        un_get.open("GET","/logout")
        un_get.send();
        un_get.onreadystatechange = ()=>{
            if(un_get.readyState ==4 && un_get.status == 200)
            {
                window.location.href ="/"
            }
        }
    }
}
function greetUser() // displaying username
{
    un_get.open('POST','/user')
    un_get.setRequestHeader('content-type','application/json')
    un_get.send(JSON.stringify(uname));
    un_get.onreadystatechange = ()=> 
    {
        if(un_get.readyState == 4 && un_get.status == 200)
        {
            let str = JSON.parse(un_get.response)
            username.textContent = `${str}`
            getAllTweets();
        }
        else if(uname.user=="")
        {
            window.location = un_get.responseURL
        }
    }
}

const http = new XMLHttpRequest()

const feed = document.getElementById('tweets')

submit.addEventListener('click', send)


function send() // making a new tweet
{
    if(tweet.value != "")
    {
        let tweeting = 
        {
            body : tweet.value,
            user : uname.user,
        }

        http.open('POST','/mew',true)
        http.setRequestHeader('content-type','application/json')
        http.send(JSON.stringify(tweeting))  
        http.onreadystatechange = ()=>
        {
            if(http.readyState == 4 && http.status == 200)
            {
                window.location.reload();
            }
        }
    }
}

function getAllTweets() // populate main page with user tweets
{
    feeding.open("POST","/feed");
    feeding.setRequestHeader('content-type','application/json')
    feeding.send(JSON.stringify(uname))
    feeding.onreadystatechange=()=>
    {
        if(feeding.readyState == 4 && feeding.status == 200)
        {
            let tweets = JSON.parse(feeding.responseText);
            for(let i = 0; i<tweets.length;i++)
            {
                let p = document.createElement('p');
                let user = document.createElement('p')
                let div = document.createElement('div')
                let svg = document.createElement('span')
                svg.innerHTML = '<svg id="deleteBtn" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>'
                svg.id = 'svg'
                div.id = tweets[i].tweet_id;
                div.classList.add('tweet')
                user.textContent = tweets[i].tweet_author;
                user.classList.add('users')
                p.textContent =tweets[i].tweet_body; 
                p.classList.add('posted-tweets'); 
                div.append(user)
                div.append(svg)
                div.append(p)
                feed.append(div)
            }

            let deleteBtn = document.querySelectorAll("#svg")
            for(let i = 0; i < deleteBtn.length;i++)
            {
                deleteBtn[i].addEventListener("click",deleteTweet)
            }
        }
    }
}



/****************************** LOGOUT *******************************/

let logout = document.getElementById("logout")
logout.addEventListener("click",logoutFunction)

function logoutFunction()
{
    document.cookie=`${uname.user}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    checkCookie();
}