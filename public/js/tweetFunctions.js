let deleteBtn = document.querySelector("deleteBtn")
deleteBtn.addEventListener("click",deleteTweet())
function deleteTweet(){
    let uid = window.localStorage.getItem(ID)
    let tweetId = this
    console.log(this);
}