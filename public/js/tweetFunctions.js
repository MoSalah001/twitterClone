window.onload = ()=>{
let deleteBtn = document.getElementById("svg")
deleteBtn.addEventListener("click",deleteTweet())
function deleteTweet(){
    let uid = window.localStorage.getItem(ID)
    let tweetId = this
    console.log(this);
}
}