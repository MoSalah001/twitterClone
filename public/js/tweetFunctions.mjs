export function deleteTweet(){
    let data = {
        userID = window.localStorage.getItem("ID"),
        tweetID = this.parentNode.parentNode.id
    }
    console.log(data);
}
